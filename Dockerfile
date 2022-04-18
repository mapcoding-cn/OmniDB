FROM python:3.6

LABEL maintainer="OmniDB team"

ARG OMNIDB_VERSION=3.0.3-cn

SHELL ["/bin/bash", "-c"]

USER root

RUN addgroup --system omnidb \
    && adduser --system omnidb --ingroup omnidb \
    && apt-get update \
    && apt-get install libsasl2-dev python-dev libldap2-dev libssl-dev vim postgresql -y

#USER omnidb:omnidb

ENV HOME /home/omnidb

COPY . ${HOME}/OmniDB


WORKDIR ${HOME}/OmniDB
RUN pip config set global.index-url http://mirrors.cloud.tencent.com/pypi/simple \
    && pip config set global.trusted-host mirrors.cloud.tencent.com \
    && ls -a \
    && pip install -r requirements.txt

WORKDIR ${HOME}/OmniDB/OmniDB

RUN python omnidb-server.py --init

EXPOSE 8000

ENV HOME /omnidb/data

RUN mkdir -p ${HOME}

RUN /etc/init.d/postgresql start

CMD python omnidb-server.py
