from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.urls import include, path

from . import views

base_urlpatterns = [

                       path('social-auth/', include('social_django.urls', namespace="social")),

                       url(r'^upload/$', views.plugins.upload_view, name='sign_in'),

                       url(r'^long_polling/$', views.polling.long_polling, name='long_polling'),
                       url(r'^create_request/$', views.polling.create_request, name='create_request'),
                       url(r'^clear_client/$', views.polling.clear_client, name='clear_client'),
                       url(r'^client_keep_alive/$', views.polling.client_keep_alive, name='client_keep_alive'),

                       # LOGIN
                       url(r'^$', views.login.check_session, name='check_session'),
                       url(r'^omnidb_login/', views.login.index, name='login'),
                       url(r'^register_user/', views.login.register_user, name='register_user'),
                       url(r'^register/', views.login.register, name='register'),
                       url(r'^logout/', views.login.logout, name='logout'),
                       url(r'^check_session_message/$', views.login.check_session_message,
                           name='check_session_message'),
                       url(r'^sign_in/$', views.login.sign_in, name='sign_in'),

                       # CONNECTIONS
                       url(r'^edit_group/$', views.connections.edit_group, name='edit_group'),
                       url(r'^delete_group/$', views.connections.delete_group, name='delete_group'),
                       url(r'^get_connections/$', views.connections.get_connections, name='get_connections'),
                       url(r'^share/(.*)$', views.connections.share_connections, name='share_connections'),
                       url(r'^save_connection/$', views.connections.save_connection, name='save_connection'),
                       url(r'^delete_connection/$', views.connections.delete_connection, name='delete_connection'),
                       url(r'^test_connection/$', views.connections.test_connection, name='test_connection'),
                       url(r'^get_groups/$', views.connections.get_groups, name='get_groups'),
                       url(r'^new_group/$', views.connections.new_group, name='new_group'),
                       url(r'^save_group_connections/$', views.connections.save_group_connections,
                           name='save_group_connections'),

                       # USERS
                       url(r'^get_users/$', views.users.get_users, name='get_users'),
                       url(r'^new_user/$', views.users.new_user, name='new_user'),
                       url(r'^remove_user/$', views.users.remove_user, name='remove_user'),
                       url(r'^save_users/$', views.users.save_users, name='save_users'),

                       # WORKSPACE
                       url(r'^workspace/', views.workspace.index, name='workspace'),
                       url(r'^shortcuts/', views.workspace.shortcuts, name='shortcuts'),
                       url(r'^close_welcome/', views.workspace.close_welcome, name='close_welcome'),
                       url(r'^save_config_user/', views.workspace.save_config_user, name='save_config_user'),
                       url(r'^save_shortcuts/', views.workspace.save_shortcuts, name='save_shortcuts'),
                       url(r'^get_database_list/', views.workspace.get_database_list, name='get_database_list'),
                       url(r'^renew_password/', views.workspace.renew_password, name='renew_password'),
                       url(r'^draw_graph/', views.workspace.draw_graph, name='draw_graph'),
                       url(r'^start_edit_data/', views.workspace.start_edit_data, name='start_edit_data'),
                       url(r'^get_completions/', views.workspace.get_completions, name='get_completions'),
                       url(r'^get_completions_table/', views.workspace.get_completions_table,
                           name='get_completions_table'),
                       url(r'^get_command_list/', views.workspace.get_command_list, name='get_command_list'),
                       url(r'^clear_command_list/', views.workspace.clear_command_list, name='clear_command_list'),
                       url(r'^indent_sql/', views.workspace.indent_sql, name='indent_sql'),
                       url(r'^refresh_monitoring/', views.workspace.refresh_monitoring, name='refresh_monitoring'),
                       url(r'^get_console_history/', views.workspace.get_console_history, name='get_console_history'),
                       url(r'^clear_console_list/', views.workspace.clear_console_list, name='clear_console_list'),
                       url(r'^get_autocomplete_results/', views.workspace.get_autocomplete_results,
                           name='get_autocomplete_results'),
                       url(r'^delete_plugin/', views.plugins.delete_plugin, name='delete_plugin'),

                       # HOOKS
                       url(r'^get_plugins/', views.plugins.get_plugins, name='get_plugins'),
                       url(r'^list_plugins/', views.plugins.list_plugins, name='list_plugins'),
                       url(r'^reload_plugins/', views.plugins.reload_plugins, name='reload_plugins'),
                       url(r'^exec_plugin_function/', views.plugins.exec_plugin_function, name='exec_plugin_function'),

                       # TREE_SNIPPETS
                       url(r'^get_node_children/', views.tree_snippets.get_node_children, name='get_node_children'),
                       url(r'^get_snippet_text/', views.tree_snippets.get_snippet_text, name='get_snippet_text'),
                       url(r'^new_node_snippet/', views.tree_snippets.new_node_snippet, name='new_node_snippet'),
                       url(r'^delete_node_snippet/', views.tree_snippets.delete_node_snippet,
                           name='delete_node_snippet'),
                       url(r'^save_snippet_text/', views.tree_snippets.save_snippet_text, name='save_snippet_text'),
                       url(r'^rename_node_snippet/', views.tree_snippets.rename_node_snippet,
                           name='rename_node_snippet'),
                       url(r'^get_all_snippets/', views.tree_snippets.get_all_snippets, name='get_all_snippets'),

                       # TREE_POSTGRESQL
                       url(r'^get_tree_info_postgresql/', views.tree_postgresql.get_tree_info, name='get_tree_info'),
                       url(r'^get_tables_postgresql/', views.tree_postgresql.get_tables, name='get_tables'),
                       url(r'^get_schemas_postgresql/', views.tree_postgresql.get_schemas, name='get_schemas'),
                       url(r'^get_columns_postgresql/', views.tree_postgresql.get_columns, name='get_columns'),
                       url(r'^get_pk_postgresql/', views.tree_postgresql.get_pk, name='get_pk'),
                       url(r'^get_pk_columns_postgresql/', views.tree_postgresql.get_pk_columns, name='get_pk_columns'),
                       url(r'^get_fks_postgresql/', views.tree_postgresql.get_fks, name='get_fks'),
                       url(r'^get_fks_columns_postgresql/', views.tree_postgresql.get_fks_columns,
                           name='get_fks_columns'),
                       url(r'^get_uniques_postgresql/', views.tree_postgresql.get_uniques, name='get_uniques'),
                       url(r'^get_uniques_columns_postgresql/', views.tree_postgresql.get_uniques_columns,
                           name='get_uniques_columns'),
                       url(r'^get_indexes_postgresql/', views.tree_postgresql.get_indexes, name='get_indexes'),
                       url(r'^get_indexes_columns_postgresql/', views.tree_postgresql.get_indexes_columns,
                           name='get_indexes_columns'),
                       url(r'^get_checks_postgresql/', views.tree_postgresql.get_checks, name='get_checks'),
                       url(r'^get_excludes_postgresql/', views.tree_postgresql.get_excludes, name='get_excludes'),
                       url(r'^get_rules_postgresql/', views.tree_postgresql.get_rules, name='get_rules'),
                       url(r'^get_rule_definition_postgresql/', views.tree_postgresql.get_rule_definition,
                           name='get_rule_definition'),
                       url(r'^get_triggers_postgresql/', views.tree_postgresql.get_triggers, name='get_triggers'),
                       url(r'^get_eventtriggers_postgresql/', views.tree_postgresql.get_eventtriggers,
                           name='get_eventtriggers'),
                       url(r'^get_inheriteds_postgresql/', views.tree_postgresql.get_inheriteds, name='get_inheriteds'),
                       url(r'^get_inheriteds_parents_postgresql/', views.tree_postgresql.get_inheriteds_parents,
                           name='get_inheriteds_parents'),
                       url(r'^get_inheriteds_children_postgresql/', views.tree_postgresql.get_inheriteds_children,
                           name='get_inheriteds_children'),
                       url(r'^get_partitions_postgresql/', views.tree_postgresql.get_partitions, name='get_partitions'),
                       url(r'^get_partitions_parents_postgresql/', views.tree_postgresql.get_partitions_parents,
                           name='get_partitions_parents'),
                       url(r'^get_partitions_children_postgresql/', views.tree_postgresql.get_partitions_children,
                           name='get_partitions_children'),
                       url(r'^get_statistics_postgresql/', views.tree_postgresql.get_statistics, name='get_statistics'),
                       url(r'^get_statistics_columns_postgresql/', views.tree_postgresql.get_statistics_columns,
                           name='get_statistics_columns'),
                       url(r'^get_functions_postgresql/', views.tree_postgresql.get_functions, name='get_functions'),
                       url(r'^get_function_fields_postgresql/', views.tree_postgresql.get_function_fields,
                           name='get_function_fields'),
                       url(r'^get_function_definition_postgresql/', views.tree_postgresql.get_function_definition,
                           name='get_function_definition'),
                       url(r'^get_function_debug_postgresql/', views.tree_postgresql.get_function_debug,
                           name='get_function_debug'),
                       url(r'^get_procedures_postgresql/', views.tree_postgresql.get_procedures, name='get_procedures'),
                       url(r'^get_procedure_fields_postgresql/', views.tree_postgresql.get_procedure_fields,
                           name='get_procedure_fields'),
                       url(r'^get_procedure_definition_postgresql/', views.tree_postgresql.get_procedure_definition,
                           name='get_procedure_definition'),
                       url(r'^get_procedure_debug_postgresql/', views.tree_postgresql.get_procedure_debug,
                           name='get_procedure_debug'),
                       url(r'^get_triggerfunctions_postgresql/', views.tree_postgresql.get_triggerfunctions,
                           name='get_triggerfunctions'),
                       url(r'^get_triggerfunction_definition_postgresql/',
                           views.tree_postgresql.get_triggerfunction_definition, name='get_triggerfunction_definition'),
                       url(r'^get_eventtriggerfunctions_postgresql/', views.tree_postgresql.get_eventtriggerfunctions,
                           name='get_eventtriggerfunctions'),
                       url(r'^get_eventtriggerfunction_definition_postgresql/',
                           views.tree_postgresql.get_eventtriggerfunction_definition,
                           name='get_eventtriggerfunction_definition'),
                       url(r'^get_aggregates_postgresql/', views.tree_postgresql.get_aggregates, name='get_aggregates'),
                       url(r'^get_sequences_postgresql/', views.tree_postgresql.get_sequences, name='get_sequences'),
                       url(r'^get_views_postgresql/', views.tree_postgresql.get_views, name='get_views'),
                       url(r'^get_views_columns_postgresql/', views.tree_postgresql.get_views_columns,
                           name='get_views_columns'),
                       url(r'^get_view_definition_postgresql/', views.tree_postgresql.get_view_definition,
                           name='get_view_definition'),
                       url(r'^get_mviews_postgresql/', views.tree_postgresql.get_mviews, name='get_mviews'),
                       url(r'^get_mviews_columns_postgresql/', views.tree_postgresql.get_mviews_columns,
                           name='get_mviews_columns'),
                       url(r'^get_mview_definition_postgresql/', views.tree_postgresql.get_mview_definition,
                           name='get_mview_definition'),
                       url(r'^get_databases_postgresql/', views.tree_postgresql.get_databases, name='get_databases'),
                       url(r'^get_tablespaces_postgresql/', views.tree_postgresql.get_tablespaces,
                           name='get_tablespaces'),
                       url(r'^get_roles_postgresql/', views.tree_postgresql.get_roles, name='get_roles'),
                       url(r'^get_extensions_postgresql/', views.tree_postgresql.get_extensions, name='get_extensions'),
                       url(r'^get_physicalreplicationslots_postgresql/',
                           views.tree_postgresql.get_physicalreplicationslots, name='get_physicalreplicationslots'),
                       url(r'^get_logicalreplicationslots_postgresql/',
                           views.tree_postgresql.get_logicalreplicationslots, name='get_logicalreplicationslots'),
                       url(r'^get_publications_postgresql/', views.tree_postgresql.get_publications,
                           name='get_publications'),
                       url(r'^get_subscriptions_postgresql/', views.tree_postgresql.get_subscriptions,
                           name='get_subscriptions'),
                       url(r'^get_publication_tables_postgresql/', views.tree_postgresql.get_publication_tables,
                           name='get_publication_tables'),
                       url(r'^get_subscription_tables_postgresql/', views.tree_postgresql.get_subscription_tables,
                           name='get_subscription_tables'),
                       url(r'^get_foreign_data_wrappers_postgresql/', views.tree_postgresql.get_foreign_data_wrappers,
                           name='get_foreign_data_wrappers'),
                       url(r'^get_foreign_servers_postgresql/', views.tree_postgresql.get_foreign_servers,
                           name='get_foreign_servers'),
                       url(r'^get_user_mappings_postgresql/', views.tree_postgresql.get_user_mappings,
                           name='get_user_mappings'),
                       url(r'^get_foreign_tables_postgresql/', views.tree_postgresql.get_foreign_tables,
                           name='get_foreign_tables'),
                       url(r'^get_foreign_columns_postgresql/', views.tree_postgresql.get_foreign_columns,
                           name='get_foreign_columns'),
                       url(r'^get_types_postgresql/', views.tree_postgresql.get_types, name='get_types'),
                       url(r'^get_domains_postgresql/', views.tree_postgresql.get_domains, name='get_domains'),
                       url(r'^kill_backend_postgresql/', views.tree_postgresql.kill_backend, name='kill_backend'),
                       url(r'^get_properties_postgresql/', views.tree_postgresql.get_properties, name='get_properties'),
                       url(r'^get_database_objects_postgresql/', views.tree_postgresql.get_database_objects,
                           name='get_database_objects'),
                       url(r'^template_select_postgresql/', views.tree_postgresql.template_select,
                           name='template_select'),
                       url(r'^template_insert_postgresql/', views.tree_postgresql.template_insert,
                           name='template_insert'),
                       url(r'^template_update_postgresql/', views.tree_postgresql.template_update,
                           name='template_update'),
                       url(r'^template_select_function_postgresql/', views.tree_postgresql.template_select_function,
                           name='template_select_function'),
                       url(r'^template_call_procedure_postgresql/', views.tree_postgresql.template_call_procedure,
                           name='template_call_procedure'),
                       url(r'^change_active_database/', views.workspace.change_active_database,
                           name='change_active_database'),
                       url(r'^get_postgresql_version/', views.tree_postgresql.get_version, name='get_version'),
                       url(r'^change_role_password_postgresql/', views.tree_postgresql.change_role_password,
                           name='change_role_password'),
                       url(r'^get_object_description_postgresql/', views.tree_postgresql.get_object_description,
                           name='get_object_description'),

                       # TREE_ORACLE
                       url(r'^get_tree_info_oracle/', views.tree_oracle.get_tree_info, name='get_tree_info'),
                       url(r'^get_tables_oracle/', views.tree_oracle.get_tables, name='get_tables'),
                       url(r'^get_columns_oracle/', views.tree_oracle.get_columns, name='get_columns'),
                       url(r'^get_pk_oracle/', views.tree_oracle.get_pk, name='get_pk'),
                       url(r'^get_pk_columns_oracle/', views.tree_oracle.get_pk_columns, name='get_pk_columns'),
                       url(r'^get_fks_oracle/', views.tree_oracle.get_fks, name='get_fks'),
                       url(r'^get_fks_columns_oracle/', views.tree_oracle.get_fks_columns, name='get_fks_columns'),
                       url(r'^get_uniques_oracle/', views.tree_oracle.get_uniques, name='get_uniques'),
                       url(r'^get_uniques_columns_oracle/', views.tree_oracle.get_uniques_columns,
                           name='get_uniques_columns'),
                       url(r'^get_indexes_oracle/', views.tree_oracle.get_indexes, name='get_indexes'),
                       url(r'^get_indexes_columns_oracle/', views.tree_oracle.get_indexes_columns,
                           name='get_indexes_columns'),
                       # url(r'^get_triggers_oracle/', views.tree_oracle.get_triggers, name='get_triggers'),
                       # url(r'^get_partitions_oracle/', views.tree_oracle.get_partitions, name='get_partitions'),
                       url(r'^get_functions_oracle/', views.tree_oracle.get_functions, name='get_functions'),
                       url(r'^get_function_fields_oracle/', views.tree_oracle.get_function_fields,
                           name='get_function_fields'),
                       url(r'^get_function_definition_oracle/', views.tree_oracle.get_function_definition,
                           name='get_function_definition'),
                       url(r'^get_procedures_oracle/', views.tree_oracle.get_procedures, name='get_procedures'),
                       url(r'^get_procedure_fields_oracle/', views.tree_oracle.get_procedure_fields,
                           name='get_procedure_fields'),
                       url(r'^get_procedure_definition_oracle/', views.tree_oracle.get_procedure_definition,
                           name='get_procedure_definition'),
                       # url(r'^get_function_debug_oracle/', views.tree_oracle.get_function_debug, name='get_function_debug'),
                       # url(r'^get_triggerfunctions_oracle/', views.tree_oracle.get_triggerfunctions, name='get_triggerfunctions'),
                       # url(r'^get_triggerfunction_definition_oracle/', views.tree_oracle.get_triggerfunction_definition, name='get_triggerfunction_definition'),
                       url(r'^get_sequences_oracle/', views.tree_oracle.get_sequences, name='get_sequences'),
                       url(r'^get_views_oracle/', views.tree_oracle.get_views, name='get_views'),
                       url(r'^get_views_columns_oracle/', views.tree_oracle.get_views_columns,
                           name='get_views_columns'),
                       url(r'^get_view_definition_oracle/', views.tree_oracle.get_view_definition,
                           name='get_view_definition'),
                       # url(r'^get_mviews_oracle/', views.tree_oracle.get_mviews, name='get_mviews'),
                       # url(r'^get_mviews_columns_oracle/', views.tree_oracle.get_mviews_columns, name='get_mviews_columns'),
                       # url(r'^get_mview_definition_oracle/', views.tree_oracle.get_mview_definition, name='get_mview_definition'),
                       url(r'^get_tablespaces_oracle/', views.tree_oracle.get_tablespaces, name='get_tablespaces'),
                       url(r'^get_roles_oracle/', views.tree_oracle.get_roles, name='get_roles'),
                       url(r'^kill_backend_oracle/', views.tree_oracle.kill_backend, name='kill_backend'),
                       url(r'^get_properties_oracle/', views.tree_oracle.get_properties, name='get_properties'),
                       url(r'^template_select_oracle/', views.tree_oracle.template_select, name='template_select'),
                       url(r'^template_insert_oracle/', views.tree_oracle.template_insert, name='template_insert'),
                       url(r'^template_update_oracle/', views.tree_oracle.template_update, name='template_update'),

                       # TREE_MYSQL
                       url(r'^get_tree_info_mysql/', views.tree_mysql.get_tree_info, name='get_tree_info'),
                       url(r'^get_tables_mysql/', views.tree_mysql.get_tables, name='get_tables'),
                       url(r'^get_columns_mysql/', views.tree_mysql.get_columns, name='get_columns'),
                       url(r'^get_pk_mysql/', views.tree_mysql.get_pk, name='get_pk'),
                       url(r'^get_pk_columns_mysql/', views.tree_mysql.get_pk_columns, name='get_pk_columns'),
                       url(r'^get_fks_mysql/', views.tree_mysql.get_fks, name='get_fks'),
                       url(r'^get_fks_columns_mysql/', views.tree_mysql.get_fks_columns, name='get_fks_columns'),
                       url(r'^get_uniques_mysql/', views.tree_mysql.get_uniques, name='get_uniques'),
                       url(r'^get_uniques_columns_mysql/', views.tree_mysql.get_uniques_columns,
                           name='get_uniques_columns'),
                       url(r'^get_indexes_mysql/', views.tree_mysql.get_indexes, name='get_indexes'),
                       url(r'^get_indexes_columns_mysql/', views.tree_mysql.get_indexes_columns,
                           name='get_indexes_columns'),
                       # url(r'^get_triggers_mysql/', views.tree_mysql.get_triggers, name='get_triggers'),
                       # url(r'^get_partitions_mysql/', views.tree_mysql.get_partitions, name='get_partitions'),
                       url(r'^get_functions_mysql/', views.tree_mysql.get_functions, name='get_functions'),
                       url(r'^get_function_fields_mysql/', views.tree_mysql.get_function_fields,
                           name='get_function_fields'),
                       url(r'^get_function_definition_mysql/', views.tree_mysql.get_function_definition,
                           name='get_function_definition'),
                       url(r'^get_procedures_mysql/', views.tree_mysql.get_procedures, name='get_procedures'),
                       url(r'^get_procedure_fields_mysql/', views.tree_mysql.get_procedure_fields,
                           name='get_procedure_fields'),
                       url(r'^get_procedure_definition_mysql/', views.tree_mysql.get_procedure_definition,
                           name='get_procedure_definition'),
                       # url(r'^get_function_debug_mysql/', views.tree_mysql.get_function_debug, name='get_function_debug'),
                       # url(r'^get_triggerfunctions_mysql/', views.tree_mysql.get_triggerfunctions, name='get_triggerfunctions'),
                       # url(r'^get_triggerfunction_definition_mysql/', views.tree_mysql.get_triggerfunction_definition, name='get_triggerfunction_definition'),
                       # url(r'^get_sequences_mysql/', views.tree_mysql.get_sequences, name='get_sequences'),
                       url(r'^get_views_mysql/', views.tree_mysql.get_views, name='get_views'),
                       url(r'^get_views_columns_mysql/', views.tree_mysql.get_views_columns, name='get_views_columns'),
                       url(r'^get_view_definition_mysql/', views.tree_mysql.get_view_definition,
                           name='get_view_definition'),
                       url(r'^get_databases_mysql/', views.tree_mysql.get_databases, name='get_databases'),
                       url(r'^get_roles_mysql/', views.tree_mysql.get_roles, name='get_roles'),
                       url(r'^kill_backend_mysql/', views.tree_mysql.kill_backend, name='kill_backend'),
                       url(r'^get_properties_mysql/', views.tree_mysql.get_properties, name='get_properties'),
                       url(r'^template_select_mysql/', views.tree_mysql.template_select, name='template_select'),
                       url(r'^template_insert_mysql/', views.tree_mysql.template_insert, name='template_insert'),
                       url(r'^template_update_mysql/', views.tree_mysql.template_update, name='template_update'),

                       # TREE_MARIADB
                       url(r'^get_tree_info_mariadb/', views.tree_mariadb.get_tree_info, name='get_tree_info'),
                       url(r'^get_tables_mariadb/', views.tree_mariadb.get_tables, name='get_tables'),
                       url(r'^get_columns_mariadb/', views.tree_mariadb.get_columns, name='get_columns'),
                       url(r'^get_pk_mariadb/', views.tree_mariadb.get_pk, name='get_pk'),
                       url(r'^get_pk_columns_mariadb/', views.tree_mariadb.get_pk_columns, name='get_pk_columns'),
                       url(r'^get_fks_mariadb/', views.tree_mariadb.get_fks, name='get_fks'),
                       url(r'^get_fks_columns_mariadb/', views.tree_mariadb.get_fks_columns, name='get_fks_columns'),
                       url(r'^get_uniques_mariadb/', views.tree_mariadb.get_uniques, name='get_uniques'),
                       url(r'^get_uniques_columns_mariadb/', views.tree_mariadb.get_uniques_columns,
                           name='get_uniques_columns'),
                       url(r'^get_indexes_mariadb/', views.tree_mariadb.get_indexes, name='get_indexes'),
                       url(r'^get_indexes_columns_mariadb/', views.tree_mariadb.get_indexes_columns,
                           name='get_indexes_columns'),
                       # url(r'^get_triggers_mariadb/', views.tree_mariadb.get_triggers, name='get_triggers'),
                       # url(r'^get_partitions_mariadb/', views.tree_mariadb.get_partitions, name='get_partitions'),
                       url(r'^get_functions_mariadb/', views.tree_mariadb.get_functions, name='get_functions'),
                       url(r'^get_function_fields_mariadb/', views.tree_mariadb.get_function_fields,
                           name='get_function_fields'),
                       url(r'^get_function_definition_mariadb/', views.tree_mariadb.get_function_definition,
                           name='get_function_definition'),
                       url(r'^get_procedures_mariadb/', views.tree_mariadb.get_procedures, name='get_procedures'),
                       url(r'^get_procedure_fields_mariadb/', views.tree_mariadb.get_procedure_fields,
                           name='get_procedure_fields'),
                       url(r'^get_procedure_definition_mariadb/', views.tree_mariadb.get_procedure_definition,
                           name='get_procedure_definition'),
                       # url(r'^get_function_debug_mariadb/', views.tree_mariadb.get_function_debug, name='get_function_debug'),
                       # url(r'^get_triggerfunctions_mariadb/', views.tree_mariadb.get_triggerfunctions, name='get_triggerfunctions'),
                       # url(r'^get_triggerfunction_definition_mariadb/', views.tree_mariadb.get_triggerfunction_definition, name='get_triggerfunction_definition'),
                       url(r'^get_sequences_mariadb/', views.tree_mariadb.get_sequences, name='get_sequences'),
                       url(r'^get_views_mariadb/', views.tree_mariadb.get_views, name='get_views'),
                       url(r'^get_views_columns_mariadb/', views.tree_mariadb.get_views_columns,
                           name='get_views_columns'),
                       url(r'^get_view_definition_mariadb/', views.tree_mariadb.get_view_definition,
                           name='get_view_definition'),
                       url(r'^get_databases_mariadb/', views.tree_mariadb.get_databases, name='get_databases'),
                       url(r'^get_roles_mariadb/', views.tree_mariadb.get_roles, name='get_roles'),
                       url(r'^kill_backend_mariadb/', views.tree_mariadb.kill_backend, name='kill_backend'),
                       url(r'^get_properties_mariadb/', views.tree_mariadb.get_properties, name='get_properties'),
                       url(r'^template_select_mariadb/', views.tree_mariadb.template_select, name='template_select'),
                       url(r'^template_insert_mariadb/', views.tree_mariadb.template_insert, name='template_insert'),
                       url(r'^template_update_mariadb/', views.tree_mariadb.template_update, name='template_update'),

                       # TREE_SQLITE
                       url(r'^get_tree_info_sqlite/', views.tree_sqlite.get_tree_info, name='get_tree_info'),
                       url(r'^get_tables_sqlite/', views.tree_sqlite.get_tables, name='get_tables'),
                       url(r'^get_columns_sqlite/', views.tree_sqlite.get_columns, name='get_columns'),
                       url(r'^get_pk_sqlite/', views.tree_sqlite.get_pk, name='get_pk'),
                       url(r'^get_pk_columns_sqlite/', views.tree_sqlite.get_pk_columns, name='get_pk_columns'),
                       url(r'^get_fks_sqlite/', views.tree_sqlite.get_fks, name='get_fks'),
                       url(r'^get_fks_columns_sqlite/', views.tree_sqlite.get_fks_columns, name='get_fks_columns'),
                       url(r'^get_uniques_sqlite/', views.tree_sqlite.get_uniques, name='get_uniques'),
                       url(r'^get_uniques_columns_sqlite/', views.tree_sqlite.get_uniques_columns,
                           name='get_uniques_columns'),
                       url(r'^get_indexes_sqlite/', views.tree_sqlite.get_indexes, name='get_indexes'),
                       url(r'^get_indexes_columns_sqlite/', views.tree_sqlite.get_indexes_columns,
                           name='get_indexes_columns'),
                       url(r'^get_triggers_sqlite/', views.tree_sqlite.get_triggers, name='get_triggers'),
                       url(r'^get_views_sqlite/', views.tree_sqlite.get_views, name='get_views'),
                       url(r'^get_views_columns_sqlite/', views.tree_sqlite.get_views_columns,
                           name='get_views_columns'),
                       url(r'^get_view_definition_sqlite/', views.tree_sqlite.get_view_definition,
                           name='get_view_definition'),
                       url(r'^get_properties_sqlite/', views.tree_sqlite.get_properties, name='get_properties'),
                       url(r'^template_select_sqlite/', views.tree_sqlite.template_select, name='template_select'),
                       url(r'^template_insert_sqlite/', views.tree_sqlite.template_insert, name='template_insert'),
                       url(r'^template_update_sqlite/', views.tree_sqlite.template_update, name='template_update'),
                       url(r'^get_sqlite_version/', views.tree_sqlite.get_version, name='get_version'),

                       # MONITORING SYSTEM
                       url(r'^test_monitor_script/', views.monitor_dashboard.test_monitor_script,
                           name='test_monitor_script'),
                       url(r'^get_monitor_unit_list/', views.monitor_dashboard.get_monitor_unit_list,
                           name='get_monitor_unit_list'),
                       url(r'^get_monitor_unit_details/', views.monitor_dashboard.get_monitor_unit_details,
                           name='get_monitor_unit_details'),
                       url(r'^get_monitor_units/', views.monitor_dashboard.get_monitor_units, name='get_monitor_units'),
                       url(r'^refresh_monitor_units/', views.monitor_dashboard.refresh_monitor_units,
                           name='refresh_monitor_units'),
                       url(r'^get_monitor_unit_template/', views.monitor_dashboard.get_monitor_unit_template,
                           name='get_monitor_unit_template'),
                       url(r'^save_monitor_unit/', views.monitor_dashboard.save_monitor_unit, name='save_monitor_unit'),
                       url(r'^delete_monitor_unit/', views.monitor_dashboard.delete_monitor_unit,
                           name='delete_monitor_unit'),
                       url(r'^remove_saved_monitor_unit/', views.monitor_dashboard.remove_saved_monitor_unit,
                           name='remove_saved_monitor_unit'),
                       url(r'^update_saved_monitor_unit_interval/',
                           views.monitor_dashboard.update_saved_monitor_unit_interval,
                           name='update_saved_monitor_unit_interval'),

                   ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.PATH == '':
    v_url = ''
else:
    v_url = settings.PATH[1:] + '/'

urlpatterns = [  # if you wish to maintain the un-prefixed URL's too
    url(v_url, include(base_urlpatterns)),
    # url(r'^subfolder/', include(base_urlpatterns))
]
