import logging

from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as logout_django
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template import loader
from django.utils import timezone

from OmniDB import settings, custom_settings
from OmniDB_app.include.Session import Session
from OmniDB_app.models.main import *
from OmniDB_app.views.memory_objects import *

logger = logging.getLogger(__name__)


@login_required
def check_session(request):
    # User is authenticated, check if user details object exists.
    try:
        user_details = UserDetails.objects.get(user=request.user)
    # User details does not exist, create it.
    except Exception:
        user_details = UserDetails(user=request.user)
        user_details.save()

    # Invalid session
    if not request.session.get('omnidb_session'):
        # creating session key to use it
        request.session.save()

        v_session = Session(
            request.user.id,
            request.user.username,
            'light',
            user_details.font_size,
            request.user.is_superuser,
            request.session.session_key,
            user_details.csv_encoding,
            user_details.csv_delimiter
        )

        request.session['omnidb_session'] = v_session

    return redirect(settings.PATH + '/workspace')


def index(request):
    context = {
        'omnidb_short_version': settings.OMNIDB_SHORT_VERSION,
        'url_folder': settings.PATH,
        'csrf_cookie_name': settings.CSRF_COOKIE_NAME,
        'username': '',
        'password': '',
        'profile': os.getenv('profile')
    }
    user_id = request.COOKIES.get('t_uid')
    if not user_id:
        user_id = request.COOKIES.get('ERP_USERNAME')
    if not user_id:
        user_id = request.COOKIES.get('km_uid')
    if user_id:
        context['username'] = user_id

    user = request.GET.get('user', '')
    pwd = request.GET.get('pwd', '')

    if user and pwd:
        num_connections = sign_in_automatic(request, user, pwd)

        if num_connections >= 0:
            return redirect('/')
        else:
            return HttpResponse("INVALID APP TOKEN")

    template = loader.get_template('OmniDB_app/login.html')
    return HttpResponse(template.render(context, request))


def register(request):
    context = {
        'omnidb_short_version': settings.OMNIDB_SHORT_VERSION,
        'url_folder': settings.PATH,
        'csrf_cookie_name': settings.CSRF_COOKIE_NAME,
        'username': '',
        'password': ''
    }
    template = loader.get_template('OmniDB_app/register.html')
    return HttpResponse(template.render(context, request))


@user_authenticated
def logout(request):
    v_session = request.session.get('omnidb_session')
    logger.info('User "{0}" logged out.'.format(v_session.v_user_name))
    logout_django(request)

    return redirect(settings.PATH + '/omnidb_login')


def check_session_message(request):
    v_return = {}
    v_return['v_data'] = ''
    v_return['v_error'] = False
    v_return['v_error_id'] = -1

    if request.session.get('omnidb_alert_message'):
        v_return['v_data'] = request.session.get('omnidb_alert_message')
        request.session['omnidb_alert_message'] = ''

    return JsonResponse(v_return)


def sign_in_automatic(request, username, pwd):
    token = request.GET.get('token', '')
    valid_token = custom_settings.APP_TOKEN

    if valid_token and token != valid_token:
        return -1

    user = authenticate(username=username, password=pwd)
    if user is not None:
        login(request, user)
    else:
        return -1

    logger.info('User "{0}" logged in.'.format(username))

    return 0


def create_user_session(request, user, user_details):
    # creating session key to use it
    request.session.save()

    v_session = Session(
        user.id,
        user.username,
        'light',
        user_details.font_size,
        request.user.is_superuser,
        request.session.session_key,
        user_details.csv_encoding,
        user_details.csv_delimiter
    )

    request.session['omnidb_session'] = v_session


def sign_in(request):
    v_return = {}
    v_return['v_data'] = -1
    v_return['v_error'] = False
    v_return['v_error_id'] = -1

    valid_token = custom_settings.APP_TOKEN

    if valid_token:
        v_return['v_data'] = -2
        return JsonResponse(v_return)

    json_object = json.loads(request.POST.get('data', None))
    username = json_object['p_username']
    pwd = json_object['p_pwd']

    user = authenticate(username=username, password=pwd)

    # 内网支持免密登录
    user_id = request.COOKIES.get('t_uid')
    if not user_id:
        user_id = request.COOKIES.get('ERP_USERNAME')
    if not user_id:
        user_id = request.COOKIES.get('km_uid')

    if username == user_id:
        if user is None:
            try:
                user = User.objects.get(username=username)
            except Exception as e:
                user = None
        if user is None:
            user = User.objects.create_user(username=username,
                                            password=username + '@12345',
                                            email='',
                                            last_login=timezone.now(),
                                            is_superuser=False,
                                            first_name='',
                                            last_name='',
                                            is_staff=False,
                                            is_active=True,
                                            date_joined=timezone.now())
    if user is not None:
        login(request, user)
    else:
        return JsonResponse(v_return)

    logger.info('User "{0}" logged in.'.format(username))

    v_return['v_data'] = 0

    return JsonResponse(v_return)


def register_user(request):
    v_return = {'v_error': False, 'v_data': '0'}

    json_object = json.loads(request.POST.get('data', None))
    username = json_object['p_username']
    pwd = json_object['p_pwd']

    if len(username) < 5 or len(pwd) < 5:
        v_return['v_data'] = "用户名/密码至少5位"
        v_return['v_error'] = True
        return JsonResponse(v_return)

    user = None
    try:
        user = User.objects.get(username=username)
    except Exception:
        None

    if user:
        v_return['v_data'] = username + "用户已经存在,忘记密码@rangobai解决"
        v_return['v_error'] = True
        return JsonResponse(v_return)

    user = User.objects.create_user(username=username,
                                    password=pwd,
                                    email='',
                                    last_login=timezone.now(),
                                    is_superuser=False,
                                    first_name='',
                                    last_name='',
                                    is_staff=False,
                                    is_active=True,
                                    date_joined=timezone.now())

    if user is not None:
        logger.info('User "{0}" register in.'.format(username))
        return JsonResponse(v_return)
    else:
        v_return['v_data'] = username + "注册失败"
        return JsonResponse(v_return)
