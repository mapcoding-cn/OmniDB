/*
This file is part of OmniDB.
OmniDB is open-source software, distributed "AS IS" under the MIT license in the hope that it will be useful.

The MIT License (MIT)

Portions Copyright (c) 2015-2020, The OmniDB Team
Portions Copyright (c) 2017-2020, 2ndQuadrant Limited

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/// <summary>
/// Retrieving tree.
/// </summary>
function getTreeOracle(p_div) {

    var context_menu = {
        'cm_server': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }]
        },
        'cm_connection': {
            elements: [{
                text: '渲染图',
                icon: 'fab cm-all fa-hubspot',
                action: function(node) {

                },
                submenu: {
                    elements: [{
                        text: '简单结构图',
                        icon: 'fab cm-all fa-hubspot',
                        action: function(node) {
                            v_connTabControl.tag.createGraphTab(
                                node.text)
                            drawGraph(false, node.tree.tag.v_username);
                        }
                    }, {
                        text: '完整结构图',
                        icon: 'fab cm-all fa-hubspot',
                        action: function(node) {
                            v_connTabControl.tag.createGraphTab(
                                node.text)
                            drawGraph(true, node.tree.tag.v_username);
                        }
                    }]
                }
            }]
        },
        'cm_tablespaces': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Tablespace',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Tablespace', node.tree
                        .tag.create_tablespace);
                }
            }/*, {
                text: 'Doc: Tablespaces',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Tablespaces',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/manage-ag-tablespaces.html'
                    );
                }
            }*/]
        },
        'cm_tablespace': {
            elements: [{
                text: '修改 Tablespace',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('修改 Tablespace', node.tree
                        .tag.alter_tablespace.replace(
                            '#tablespace_name#', node.text)
                    );
                }
            }, {
                text: '删除 Tablespace',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Tablespace', node.tree
                        .tag.drop_tablespace.replace(
                            '#tablespace_name#', node.text)
                    );
                }
            }]
        },
        'cm_roles': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Role',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Role', node.tree.tag
                        .create_role);
                }
            }/*, {
                text: 'Doc: Roles',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Roles',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/user-manag.html');
                }
            }*/]
        },
        'cm_role': {
            elements: [{
                text: '修改 Role',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('修改 Role', node.tree.tag.alter_role
                        .replace('#role_name#', node.text));
                }
            }, {
                text: '删除 Role',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Role', node.tree.tag.drop_role
                        .replace('#role_name#', node.text));
                }
            }]
        },
        'cm_tables': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Table',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建表', node.tree.tag
                        .create_table.replace(
                            '#schema_name#', node.tree.tag.v_username));
                }
            }/*, {
                text: 'Doc: Basics',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Table Basics',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/ddl-basics.html');
                }
            }, {
                text: 'Doc: Constraints',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Table Constraints',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/ddl-constraints.html');
                }
            }, {
                text: 'Doc: Modifying',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Modifying Tables',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/ddl-alter.html');
                }
            }*/]
        },
        'cm_table': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '数据操作',
                icon: 'fas cm-all fa-list',
                submenu: {
                    elements: [{
                        text: '查询数据',
                        icon: 'fas cm-all fa-search',
                        action: function(node) {
                            TemplateSelectOracle(node.tree
                              .tag.v_username, node.text);
                        }
                    }, {
                        text: '修改数据',
                        icon: 'fas cm-all fa-table',
                        action: function(node) {
                            v_startEditData(node.text,
                                node.tree.tag.v_username
                            );
                        }
                    }, {
                        text: '插入记录',
                        icon: 'fas cm-all fa-edit',
                        action: function(node) {
                            TemplateInsertOracle(node.tree
                              .tag.v_username, node.text);
                        }
                    }, {
                        text: '修改记录',
                        icon: 'fas cm-all fa-edit',
                        action: function(node) {
                            TemplateUpdateOracle(node.tree
                              .tag.v_username, node.text);
                        }
                    }, {
                        text: '删除记录',
                        icon: 'fas cm-all fa-times',
                        action: function(node) {
                          tabSQLTemplate(
                              '删除记录',
                              node.tree.tag.delete
                              .replace(
                                  '#table_name#',
                                  node.tree.tag.v_username + '.' +
                                  node.text));
                        }
                    }]
                }
            }, {
                text: '表操作',
                icon: 'fas cm-all fa-list',
                submenu: {
                    elements: [{
                        text: '修改表',
                        icon: 'fas cm-all fa-table',
                        action: function(node) {
                            startAlterTable(true,
                                'alter', node.text,
                                node.tree.tag.v_username
                            );
                        }
                    }, {
                        text: '修改 Table (SQL)',
                        icon: 'fas cm-all fa-edit',
                        action: function(node) {
                            tabSQLTemplate('修改表', node.tree.tag
                                .alter_table.replace(
                                    '#table_name#', node.tree.tag.v_username
                                    + '.' + node.text));
                        }
                    }, {
                        text: '删除表',
                        icon: 'fas cm-all fa-times',
                        action: function(node) {
                            tabSQLTemplate('删除表',
                                node.tree.tag.drop_table
                                .replace(
                                    '#table_name#',
                                    node.tree.tag.v_username + '.' + node.text));
                        }
                    }]
                }
            }]
        },
        'cm_columns': {
            elements: [{
                text: '创建Column',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Field', node.tree.tag
                        .create_column.replace(
                            '#table_name#', node.tree.tag.v_username + '.' + node.parent
                            .text));
                }
            }]
        },
        'cm_column': {
            elements: [{
                text: '修改列',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('修改列', node.tree.tag
                        .alter_column.replace(
                            '#table_name#', node.tree.tag.v_username + '.' +
                            node.parent.parent.text).replace(
                            /#column_name#/g, node.text));
                }
            }, {
                text: '删除列',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除列', node.tree.tag
                        .drop_column.replace('#table_name#',
                            node.tree.tag.v_username + '.' + node.parent.parent
                            .text).replace(/#column_name#/g,
                            node.text));
                }
            }]
        },
        'cm_pks': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Primary Key',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Primary Key', node.tree
                        .tag.create_primarykey.replace(
                            '#table_name#', node.tree.tag.v_username + '.' + node.parent
                            .text));
                }
            }]
        },
        'cm_pk': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '删除 Primary Key',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Primary Key', node.tree
                        .tag.drop_primarykey.replace(
                            '#table_name#', node.tree.tag.v_username + '.' +
                            node.parent.parent.text).replace(
                            '#constraint_name#', node.text)
                    );
                }
            }]
        },
        'cm_fks': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Foreign Key',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Foreign Key', node.tree
                        .tag.create_foreignkey.replace(
                            '#table_name#', node.tree.tag.v_username + '.' + node.parent
                            .text));
                }
            }]
        },
        'cm_fk': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '删除 Foreign Key',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Foreign Key', node.tree
                        .tag.drop_foreignkey.replace(
                            '#table_name#', node.tree.tag.v_username + '.' +
                            node.parent.parent.text).replace(
                            '#constraint_name#', node.text)
                    );
                }
            }]
        },
        'cm_uniques': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Unique',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Unique', node.tree.tag
                        .create_unique.replace(
                            '#table_name#', node.tree.tag.v_username + '.' + node.parent
                            .text));
                }
            }]
        },
        'cm_unique': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '删除 Unique',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Unique', node.tree.tag
                        .drop_unique.replace('#table_name#',
                            node.tree.tag.v_username + '.' + node.parent.parent
                            .text).replace(
                            '#constraint_name#', node.text)
                    );
                }
            }]
        },
        'cm_indexes': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Index',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Index', node.tree.tag
                        .create_index.replace(
                            '#table_name#', node.tree.tag.v_username + '.' + node.parent
                            .text));
                }
            }/*, {
                text: 'Doc: Indexes',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Indexes',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/indexes.html');
                }
            }*/]
        },
        'cm_index': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '修改 Index',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('修改 Index', node.tree.tag
                        .alter_index.replace('#index_name#',
                            node.tree.tag.v_username + '.' +
                            node.text.replace(' (Unique)',
                                '').replace(' (Non Unique)',
                                '')));
                }
            }, {
                text: '删除 Index',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Index', node.tree.tag.drop_index
                        .replace('#index_name#', node.tree.tag.v_username + '.' + node.text.replace(
                                ' (Unique)', '').replace(
                                ' (Non Unique)', '')));
                }
            }]
        },
        'cm_sequences': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Sequence',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Sequence', node.tree
                        .tag.create_sequence.replace(
                            '#schema_name#', node.tree.tag.v_username
                        ));
                }
            }/*, {
                text: 'Doc: Sequences',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Sequences',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/sql-createsequence.html');
                }
            }*/]
        },
        'cm_sequence': {
            elements: [{
                text: '修改 Sequence',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('修改 Sequence', node.tree.tag
                        .alter_sequence.replace(
                            '#sequence_name#', node.tree.tag.v_username + '.' + node.text));
                }
            }, {
                text: '删除 Sequence',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Sequence', node.tree.tag
                        .drop_sequence.replace(
                            '#sequence_name#', node.tree.tag.v_username + '.' + node.text));
                }
            }]
        },
        'cm_views': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建View',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建View', node.tree.tag
                        .create_view.replace(
                            '#schema_name#', node.tree.tag.v_username
                        ));
                }
            }/*, {
                text: 'Doc: Views',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Views',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/sql-createview.html');
                }
            }*/]
        },
        'cm_view': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '查询数据',
                icon: 'fas cm-all fa-search',
                action: function(node) {

                    var v_table_name = '';
                    v_table_name = node.tree.tag.v_username + '.' + node.text;

                    v_connTabControl.tag.createQueryTab(
                        node.text);

                    v_connTabControl.selectedTab.tag.tabControl
                        .selectedTab.tag.editor.setValue(
                            '-- Querying Data\nselect t.*\nfrom ' +
                            v_table_name + ' t');
                    v_connTabControl.selectedTab.tag.tabControl
                        .selectedTab.tag.editor.clearSelection();
                    renameTabConfirm(v_connTabControl.selectedTab
                        .tag.tabControl.selectedTab, node.text
                    );

                    //minimizeEditor();

                    querySQL(0);
                }
            }, {
                text: 'Edit View',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    v_connTabControl.tag.createQueryTab(
                        node.text);
                    getViewDefinitionOracle(node);
                }
            }, {
                text: '删除 View',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 View', node.tree.tag.drop_view
                        .replace('#view_name#', node.tree.tag.v_username + '.' + node.text)
                    );
                }
            }]
        },
        /*'cm_triggers': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                },
            }, {
                text: '创建Trigger',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Trigger', node.tree.tag
                        .create_trigger.replace(
                            '#table_name#', node.tree.tag.v_username + '.' + node.parent
                            .text));
                }
            }, {
                text: 'Doc: Triggers',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Triggers',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/trigger-definition.html');
                }
            }]
        },
        'cm_view_triggers': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                },
            }, {
                text: '创建Trigger',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Trigger', node.tree.tag
                        .create_view_trigger.replace(
                            '#table_name#', node.tree.tag.v_username + '.' + node.parent
                            .text));
                }
            }, {
                text: 'Doc: Triggers',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Triggers',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/trigger-definition.html');
                }
            }]
        },
        'cm_trigger': {
            elements: [{
                text: '修改 Trigger',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('修改 Trigger', node.tree.tag
                        .alter_trigger.replace(
                            '#table_name#', node.tree.tag.v_username + '.' +
                            node.parent.parent.text).replace(
                            '#trigger_name#', node.text));
                }
            }, {
                text: 'Enable Trigger',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('Enable Trigger', node.tree.tag
                        .enable_trigger.replace(
                            '#table_name#', node.tree.tag.v_username + '.' +
                            node.parent.parent.text).replace(
                            '#trigger_name#', node.text));
                }
            }, {
                text: 'Disable Trigger',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('Disable Trigger', node.tree
                        .tag.disable_trigger.replace(
                            '#table_name#', node.tree.tag.v_username + '.' +
                            node.parent.parent.text).replace(
                            '#trigger_name#', node.text));
                }
            }, {
                text: '删除 Trigger',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Trigger', node.tree.tag
                        .drop_trigger.replace(
                            '#table_name#', node.tree.tag.v_username + '.' +
                            node.parent.parent.text).replace(
                            '#trigger_name#', node.text));
                }
            }]
        },
        'cm_partitions': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Partition',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Partition', node.tree
                        .tag.create_partition.replace(
                            '#table_name#', node.tree.tag.v_username + '.' + node.parent
                            .text));
                }
            }, {
                text: 'Doc: Partitions',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Partitions',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/ddl-partitioning.html');
                }
            }]
        },
        'cm_partition': {
            elements: [{
                text: 'No Inherit Partition',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('No Inherit Partition', node
                        .tree.tag.noinherit_partition.replace(
                            '#table_name#', node.tree.tag.v_username + '.' +
                            node.parent.parent.text).replace(
                            '#partition_name#', node.text));
                }
            }, {
                text: '删除 Partition',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Partition', node.tree.tag
                        .drop_partition.replace(
                            '#partition_name#', node.text));
                }
            }]
        },*/
        'cm_functions': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Function',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Function', node.tree
                        .tag.create_function.replace(
                            '#schema_name#', node.tree.tag.v_username
                        ));
                }
            }/*, {
                text: 'Doc: Functions',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Functions',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/sql-createfunction.html');
                }
            }*/]
        },
        'cm_function': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: 'Edit Function',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    v_connTabControl.tag.createQueryTab(
                        node.text);
                    getFunctionDefinitionOracle(node);
                }
            }, {
                text: '删除 Function',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Function', node.tree.tag
                        .drop_function.replace(
                            '#function_name#', node.tag.id)
                    );
                }
            }]
        },
        'cm_procedures': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Procedure',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Procedure', node.tree
                        .tag.create_procedure.replace(
                            '#schema_name#', node.tree.tag.v_username
                        ));
                }
            }/*, {
                text: 'Doc: Procedures',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Functions',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/sql-createfunction.html');
                }
            }*/]
        },
        'cm_procedure': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: 'Edit Procedure',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    v_connTabControl.tag.createQueryTab(
                        node.text);
                    getProcedureDefinitionOracle(node);
                }
            }, {
                text: '删除 Procedure',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Procedure', node.tree.tag
                        .drop_procedure.replace(
                            '#function_name#', node.tag.id)
                    );
                }
            }]
        },
        /*'cm_triggerfunctions': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Trigger Function',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Trigger Function',
                        node.tree.tag.create_triggerfunction
                        .replace('#schema_name#', node.tree.tag.v_username));
                }
            }, {
                text: 'Doc: Trigger Functions',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Trigger Functions',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/plpgsql-trigger.html');
                }
            }]
        },
        'cm_triggerfunction': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: 'Edit Trigger Function',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    v_connTabControl.tag.createQueryTab(
                        node.text);
                    getTriggerFunctionDefinitionOracle(node);
                }
            }, {
                text: '删除 Trigger Function',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Trigger Function',
                        node.tree.tag.drop_triggerfunction.replace(
                            '#function_name#', node.tag.id)
                    );
                }
            }]
        },
        'cm_mviews': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '创建Mat. View',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('创建Materialized View',
                        node.tree.tag
                        .create_mview.replace(
                            '#schema_name#', node.tree.tag.v_username
                        ));
                }
            }, {
                text: 'Doc: Mat. Views',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: Materialized Views',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/sql-creatematerializedview.html'
                    );
                }
            }]
        },
        'cm_mview': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }, {
                text: '查询数据',
                icon: 'fas cm-all fa-search',
                action: function(node) {

                    var v_table_name = '';
                    v_table_name = node.tree.tag.v_username + '.' + node.text;

                    v_connTabControl.tag.createQueryTab(
                        node.text);

                    v_connTabControl.selectedTab.tag.tabControl
                        .selectedTab.tag.sel_filtered_data.value =
                        1;

                    v_connTabControl.selectedTab.tag.tabControl
                        .selectedTab.tag.editor.setValue(
                            '-- Querying Data\nselect t.*\nfrom ' +
                            v_table_name + ' t');
                    v_connTabControl.selectedTab.tag.tabControl
                        .selectedTab.tag.editor.clearSelection();
                    renameTabConfirm(v_connTabControl.selectedTab
                        .tag.tabControl.selectedTab, node.text
                    );

                    //minimizeEditor();

                    querySQL(0);
                }
            }, {
                text: 'Edit Mat. View',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    v_connTabControl.tag.createQueryTab(
                        node.text);
                    getMaterializedViewDefinitionOracle(
                        node);
                }
            }, {
                text: 'Refresh Mat. View',
                icon: 'fas cm-all fa-edit',
                action: function(node) {
                    tabSQLTemplate('Refresh Materialized View',
                        node.tree.tag.refresh_mview
                        .replace('#view_name#', node.tree.tag.v_username + '.' + node.text)
                    );
                }
            }, {
                text: '删除 Mat. View',
                icon: 'fas cm-all fa-times',
                action: function(node) {
                    tabSQLTemplate('删除 Materialized View',
                        node.tree.tag.drop_mview
                        .replace('#view_name#', node.tree.tag.v_username + '.' + node.text)
                    );
                }
            }]
        },*/
        'cm_refresh': {
            elements: [{
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            }]
        }
    };
    var tree = createTree(p_div, '#fcfdfd', context_menu);
    v_connTabControl.selectedTab.tag.tree = tree;
    let v_autocomplete_switch_status = (v_connTabControl.selectedTab.tag.enable_autocomplete !== false) ? ' checked ' : '';
    v_connTabControl.selectedTab.tag.divDetails.innerHTML =
    '<i class="fas fa-server mr-1"></i>当前数据库: ' +
    '<b>' + v_connTabControl.selectedTab.tag.selectedDatabase + '</b>' +
    '<div class="omnidb__switch omnidb__switch--sm float-right" data-toggle="tooltip" data-placement="bottom" data-html="true" title="" data-original-title="<h5>自动语法补全</h5><div>Switch OFF <b>disables the autocomplete</b> on the inner tabs for this connection.</div>">' +
			'<input type="checkbox" ' + v_autocomplete_switch_status + ' id="autocomplete_toggler_' + v_connTabControl.selectedTab.tag.tab_id + '" class="omnidb__switch--input" onchange="toggleConnectionAutocomplete(\'autocomplete_toggler_' + v_connTabControl.selectedTab.tag.tab_id + '\')">' +
			'<label for="autocomplete_toggler_' + v_connTabControl.selectedTab.tag.tab_id + '" class="omnidb__switch--label"><span><i class="fas fa-spell-check"></i></span></label>' +
		'</div>';

    tree.nodeAfterOpenEvent = function(node) {
        refreshTreeOracle(node);
    }

    tree.clickNodeEvent = function(node) {
      if (v_connTabControl.selectedTab.tag.treeTabsVisible) {
        getPropertiesOracle(node);
      }
      else {
        // Do nothing
      }
    }

    tree.beforeContextMenuEvent = function(node, callback) {

        var v_elements = [];
        //Hooks
        if (v_connTabControl.tag.hooks.oracleTreeContextMenu.length>0) {
          for (var i=0; i<v_connTabControl.tag.hooks.oracleTreeContextMenu.length; i++)
            v_elements = v_elements.concat(v_connTabControl.tag.hooks.oracleTreeContextMenu[i](node));
        }

        var v_customCallback = function() {
          callback(v_elements);
        }
        v_customCallback();
    }

    var node_server = tree.createNode('Oracle', false,
        'node-oracle', null, {
            type: 'server'
        }, 'cm_server');
    node_server.createChildNode('', true, 'node-spin',
        null, null);
    tree.drawTree();

}

/// <summary>
/// Retrieving properties.
/// </summary>
/// <param name="node">Node object.</param>
function getPropertiesOracle(node) {
    if (node.tag != undefined)
        if (node.tag.type == 'role') {
          getProperties('/get_properties_oracle/',
            {
              p_schema: null,
              p_table: null,
              p_object: node.text,
              p_type: node.tag.type
            });
        } else if (node.tag.type == 'tablespace') {
          getProperties('/get_properties_oracle/',
            {
              p_schema: null,
              p_table: null,
              p_object: node.text,
              p_type: node.tag.type
            });
        } else if (node.tag.type == 'table') {
        getProperties('/get_properties_oracle/',
          {
            p_schema: null,
            p_table: null,
            p_object: node.text,
            p_type: node.tag.type
          });
      } else if (node.tag.type == 'sequence') {
        getProperties('/get_properties_oracle/',
          {
            p_schema: null,
            p_table: null,
            p_object: node.text,
            p_type: node.tag.type
          });
      } else if (node.tag.type == 'view') {
        getProperties('/get_properties_oracle/',
          {
            p_schema: null,
            p_table: null,
            p_object: node.text,
            p_type: node.tag.type
          });
      } else if (node.tag.type == 'mview') {
        getProperties('/get_properties_oracle/',
          {
            p_schema: null,
            p_table: null,
            p_object: node.text,
            p_type: node.tag.type
          });
      } else if (node.tag.type == 'function') {
        getProperties('/get_properties_oracle/',
          {
            p_schema: null,
            p_table: null,
            p_object: node.text,
            p_type: node.tag.type
          });
      } else if (node.tag.type == 'procedure') {
        getProperties('/get_properties_oracle/',
          {
            p_schema: null,
            p_table: null,
            p_object: node.text,
            p_type: node.tag.type
          });
      } else if (node.tag.type == 'trigger') {
        getProperties('/get_properties_oracle/',
          {
            p_schema: null,
            p_table: node.parent.parent.text,
            p_object: node.text,
            p_type: node.tag.type
          });
      } else if (node.tag.type == 'triggerfunction') {
        getProperties('/get_properties_oracle/',
          {
            p_schema: null,
            p_table: null,
            p_object: node.text,
            p_type: node.tag.type
          });
      } else {
        clearProperties();
      }

      //Hooks
      if (v_connTabControl.tag.hooks.oracleTreeNodeClick.length>0) {
        for (var i=0; i<v_connTabControl.tag.hooks.oracleTreeNodeClick.length; i++)
          v_connTabControl.tag.hooks.oracleTreeNodeClick[i](node);
      }
}

/// <summary>
/// Refreshing tree node.
/// </summary>
/// <param name="node">Node object.</param>
function refreshTreeOracle(node) {
    if (node.tag != undefined)
        if (node.tag.type == 'table_list') {
            getTablesOracle(node);
    } else if (node.tag.type == 'table') {
        getColumnsOracle(node);
    } else if (node.tag.type == 'primary_key') {
        getPKOracle(node);
    } else if (node.tag.type == 'pk') {
        getPKColumnsOracle(node);
    } else if (node.tag.type == 'uniques') {
        getUniquesOracle(node);
    } else if (node.tag.type == 'unique') {
        getUniquesColumnsOracle(node);
    } else if (node.tag.type == 'foreign_keys') {
        getFKsOracle(node);
    } else if (node.tag.type == 'foreign_key') {
        getFKsColumnsOracle(node);
    } else if (node.tag.type == 'view_list') {
        getViewsOracle(node);
    } else if (node.tag.type == 'view') {
        getViewsColumnsOracle(node);
    } /*else if (node.tag.type == 'mview_list') {
        getMaterializedViewsOracle(node);
    } else if (node.tag.type == 'mview') {
        getMaterializedViewsColumnsOracle(node);
    } */else if (node.tag.type == 'indexes') {
        getIndexesOracle(node);
    } else if (node.tag.type == 'index') {
        getIndexesColumnsOracle(node);
    } else if (node.tag.type == 'function_list') {
        getFunctionsOracle(node);
    } else if (node.tag.type == 'function') {
        getFunctionFieldsOracle(node);
    } else if (node.tag.type == 'procedure_list') {
        getProceduresOracle(node);
    } else if (node.tag.type == 'procedure') {
        getProcedureFieldsOracle(node);
    } else if (node.tag.type == 'sequence_list') {
        getSequencesOracle(node);
    } else if (node.tag.type == 'tablespace_list') {
        getTablespacesOracle(node);
    } else if (node.tag.type == 'role_list') {
        getRolesOracle(node);
    } /*else if (node.tag.type == 'trigger_list') {
        getTriggersOracle(node);
    } else if (node.tag.type == 'triggerfunction_list') {
        getTriggerFunctionsOracle(node);
    } else if (node.tag.type == 'partition_list') {
        getPartitionsOracle(node);
    } */else if (node.tag.type == 'server') {
        getTreeDetailsOracle(node);
    }
    else {
      afterNodeOpenedCallbackOracle(node);
    }
}

function afterNodeOpenedCallbackOracle(node) {
  //Hooks
  if (v_connTabControl.tag.hooks.oracleTreeNodeOpen.length>0) {
    for (var i=0; i<v_connTabControl.tag.hooks.oracleTreeNodeOpen.length; i++)
      v_connTabControl.tag.hooks.oracleTreeNodeOpen[i](node);
  }
}

/// <summary>
/// Retrieving tree details.
/// </summary>
/// <param name="node">Node object.</param>
function getTreeDetailsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_tree_info_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id
        }),
        function(p_return) {

            node.tree.contextMenu.cm_server.elements = []
            node.tree.contextMenu.cm_server.elements.push({
                text: '刷新',
                icon: 'fas cm-all fa-sync-alt',
                action: function(node) {
                    if (node.childNodes == 0)
                        refreshTreeOracle(node);
                    else {
                        node.collapseNode();
                        node.expandNode();
                    }
                }
            });

            /*node.tree.contextMenu.cm_server.elements.push({
                text: 'Doc: PostgreSQL',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: PostgreSQL',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/');
                }
            });
            node.tree.contextMenu.cm_server.elements.push({
                text: 'Doc: SQL Language',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: SQL Language',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/sql.html');
                }
            });
            node.tree.contextMenu.cm_server.elements.push({
                text: 'Doc: SQL Commands',
                icon: 'fas cm-all fa-globe-americas',
                action: function(node) {
                    v_connTabControl.tag.createWebsiteTab(
                        'Documentation: SQL Commands',
                        'https://www.postgresql.org/docs/' +
                        getMajorVersionOracle(node.tree.tag.version) +
                        '/static/sql-commands.html');
                }
            });*/

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            node.tree.tag = {
                version: p_return.v_data.v_database_return.version,
                v_username: p_return.v_data.v_database_return.v_username,
                superuser: p_return.v_data.v_database_return.superuser,
                express: p_return.v_data.v_database_return.express,
                create_role: p_return.v_data.v_database_return.create_role,
                alter_role: p_return.v_data.v_database_return.alter_role,
                drop_role: p_return.v_data.v_database_return.drop_role,
                create_tablespace: p_return.v_data.v_database_return.create_tablespace,
                alter_tablespace: p_return.v_data.v_database_return.alter_tablespace,
                drop_tablespace: p_return.v_data.v_database_return.drop_tablespace,
                create_sequence: p_return.v_data.v_database_return.create_sequence,
                alter_sequence: p_return.v_data.v_database_return.alter_sequence,
                drop_sequence: p_return.v_data.v_database_return.drop_sequence,
                create_function: p_return.v_data.v_database_return.create_function,
                drop_function: p_return.v_data.v_database_return.drop_function,
                create_procedure: p_return.v_data.v_database_return.create_procedure,
                drop_procedure: p_return.v_data.v_database_return.drop_procedure,
                //create_triggerfunction: p_return.v_data.v_database_return
                //    .create_triggerfunction,
                //drop_triggerfunction: p_return.v_data.v_database_return
                //    .drop_triggerfunction,
                create_view: p_return.v_data.v_database_return.create_view,
                drop_view: p_return.v_data.v_database_return.drop_view,
                //create_mview: p_return.v_data.v_database_return.create_mview,
                //refresh_mview: p_return.v_data.v_database_return.refresh_mview,
                //drop_mview: p_return.v_data.v_database_return.drop_mview,
                create_table: p_return.v_data.v_database_return.create_table,
                alter_table: p_return.v_data.v_database_return.alter_table,
                drop_table: p_return.v_data.v_database_return.drop_table,
                create_column: p_return.v_data.v_database_return.create_column,
                alter_column: p_return.v_data.v_database_return.alter_column,
                drop_column: p_return.v_data.v_database_return.drop_column,
                create_primarykey: p_return.v_data.v_database_return.create_primarykey,
                drop_primarykey: p_return.v_data.v_database_return.drop_primarykey,
                create_unique: p_return.v_data.v_database_return.create_unique,
                drop_unique: p_return.v_data.v_database_return.drop_unique,
                create_foreignkey: p_return.v_data.v_database_return.create_foreignkey,
                drop_foreignkey: p_return.v_data.v_database_return.drop_foreignkey,
                create_index: p_return.v_data.v_database_return.create_index,
                alter_index: p_return.v_data.v_database_return.alter_index,
                drop_index: p_return.v_data.v_database_return.drop_index,
                //create_trigger: p_return.v_data.v_database_return.create_trigger,
                //create_view_trigger: p_return.v_data.v_database_return.create_view_trigger,
                //alter_trigger: p_return.v_data.v_database_return.alter_trigger,
                //enable_trigger: p_return.v_data.v_database_return.enable_trigger,
                //disable_trigger: p_return.v_data.v_database_return.disable_trigger,
                //drop_trigger: p_return.v_data.v_database_return.drop_trigger,
                //create_partition: p_return.v_data.v_database_return.create_partition,
                //noinherit_partition: p_return.v_data.v_database_return.noinherit_partition,
                //drop_partition: p_return.v_data.v_database_return.drop_partition
                delete: p_return.v_data.v_database_return.delete
            }

            if (node.tree.tag.superuser) {
                node.tree.contextMenu.cm_server.elements.push({
                    text: '监控',
                    icon: 'fas cm-all fa-chart-line',
                    action: function(node) {},
                    submenu: {
                        elements: [/*{
                            text: '大盘',
                            icon: 'fas cm-all fa-chart-line',
                            action: function(node) {
                                v_connTabControl.tag.createMonitorDashboardTab();
                                startMonitorDashboard();
                            }
                        }, */{
                            text: 'Sessions',
                            icon: 'fas cm-all fa-chart-line',
                            action: function(node) {
                                v_connTabControl.tag.createMonitoringTab(
                                    'Sessions',
                                    'select * from v$session', [{
                                        icon: 'fas cm-all fa-times',
                                        title: 'Terminate',
                                        action: 'oracleTerminateBackend'
                                    }]);
                            }
                        }]
                    }
                });
            }/* else {
                node.tree.contextMenu.cm_server.elements.push({
                    text: '监控',
                    icon: 'fas cm-all fa-chart-line',
                    action: function(node) {},
                    submenu: {
                        elements: [{
                            text: '大盘',
                            icon: 'fas cm-all fa-chart-line',
                            action: function(node) {
                                v_connTabControl.tag.createMonitorDashboardTab();
                                startMonitorDashboard();
                            }
                        }]
                    }
                });
            }*/

            node.setText(p_return.v_data.v_database_return.version);

            var node_connection = node.createChildNode(p_return.v_data.v_database_return
                .v_database, true, 'fas node-all fa-database node-database-list', {
                    type: 'connection'
                }, 'cm_connection');

            if (node.tree.tag.superuser) {
                var node_tablespaces = node.createChildNode('Tablespaces',
                    false, 'fas node-all fa-folder-open node-tablespace-list', {
                        type: 'tablespace_list',
                        num_tablespaces: 0
                    }, 'cm_tablespaces');
                node_tablespaces.createChildNode('', true,
                    'node-spin', null, null);
                var node_roles = node.createChildNode('Roles', false,
                    'fas node-all fa-users node-user-list', {
                        type: 'role_list',
                        num_roles: 0
                    }, 'cm_roles');
                node_roles.createChildNode('', true,
                    'node-spin', null, null);
            }

            var node_tables = node_connection.createChildNode('Tables', false,
                'fas node-all fa-th node-table-list', {
                    type: 'table_list',
                    num_tables: 0
                }, 'cm_tables');
            node_tables.createChildNode('', true,
                'node-spin', null, null);

            var node_sequences = node_connection.createChildNode('Sequences',
                false,
                'fas node-all fa-sort-numeric-down node-sequence-list', {
                    type: 'sequence_list',
                    num_sequences: 0
                }, 'cm_sequences');
            node_sequences.createChildNode('', true,
                'node-spin', null, null);

            var node_views = node_connection.createChildNode('Views', false,
                'fas node-all fa-eye node-view-list', {
                    type: 'view_list',
                    num_views: 0
                }, 'cm_views');
            node_views.createChildNode('', true,
                'node-spin', null, null);

            /*var node_mviews = node_connection.createChildNode(
                'Materialized Views', false,
                'fas node-all fa-eye node-mview-list', {
                    type: 'mview_list',
                    num_views: 0
                }, 'cm_mviews');
            node_mviews.createChildNode('', true,
                'node-spin', null, null);*/

            var node_functions = node_connection.createChildNode('Functions',
                false, 'fas node-all fa-cog node-function-list', {
                    type: 'function_list',
                    num_functions: 0
                }, 'cm_functions');
            node_functions.createChildNode('', true,
                'node-spin', null, null);

            var node_functions = node_connection.createChildNode('Procedures',
                false, 'fas node-all fa-cog node-procedure-list', {
                    type: 'procedure_list',
                    num_functions: 0
                }, 'cm_procedures');
            node_functions.createChildNode('', true,
                'node-spin', null, null);

            if (v_connTabControl.selectedTab.tag.firstTimeOpen) {
              v_connTabControl.selectedTab.tag.firstTimeOpen = false;
              //v_connTabControl.tag.createMonitorDashboardTab();
              //startMonitorDashboard();
            }

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);

}

/// <summary>
/// Retrieving tablespaces.
/// </summary>
/// <param name="node">Node object.</param>
function getTablespacesOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_tablespaces_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            node.setText('Tablespaces (' + p_return.v_data.length + ')');

            node.tag.num_tablespaces = p_return.v_data.length;

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node = node.createChildNode(p_return.v_data[i].v_name,
                    false, 'fas node-all fa-folder node-tablespace', {
                        type: 'tablespace'
                    }, 'cm_tablespace',null,false);

            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving roles.
/// </summary>
/// <param name="node">Node object.</param>
function getRolesOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_roles_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            node.setText('Roles (' + p_return.v_data.length + ')');

            node.tag.num_tablespaces = p_return.v_data.length;

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node = node.createChildNode(p_return.v_data[i].v_name,
                    false, 'fas node-all fa-user node-user', {
                        type: 'role'
                    }, 'cm_role',null,false);

            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving tables.
/// </summary>
/// <param name="node">Node object.</param>
function getTablesOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);


    execAjax('/get_tables_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            node.setText('Tables (' + p_return.v_data.length + ')');

            node.tag.num_tables = p_return.v_data.length;

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node = node.createChildNode(p_return.v_data[i].v_name,
                    false, 'fas node-all fa-table node-table', {
                        type: 'table',
                        has_primary_keys: p_return.v_data[i].v_has_primary_keys,
                        has_foreign_keys: p_return.v_data[i].v_has_foreign_keys,
                        has_uniques: p_return.v_data[i].v_has_uniques,
                        has_indexes: p_return.v_data[i].v_has_indexes,
                        has_checks: p_return.v_data[i].v_has_checks,
                        has_excludes: p_return.v_data[i].v_has_excludes,
                        has_rules: p_return.v_data[i].v_has_rules,
                        has_triggers: p_return.v_data[i].v_has_triggers,
                        has_partitions: p_return.v_data[i].v_has_partitions,
                        has_statistics: p_return.v_data[i].v_has_statistics
                    }, 'cm_table',null,false);
                v_node.createChildNode('', false,
                    'node-spin', {
                        type: 'table_field'
                    }, null,null,false);

            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving sequences.
/// </summary>
/// <param name="node">Node object.</param>
function getSequencesOracle(node) {
    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_sequences_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_schema": null
        }),
        function(p_return) {

            node.setText('Sequences (' + p_return.v_data.length + ')');

            node.tag.num_tables = p_return.v_data.length;

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node = node.createChildNode(p_return.v_data[i].v_sequence_name,
                    false,
                    'fas node-all fa-sort-numeric-down node-sequence', {
                        type: 'sequence'
                    }, 'cm_sequence',null,false);

            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving views.
/// </summary>
/// <param name="node">Node object.</param>
function getViewsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_views_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            node.setText('Views (' + p_return.v_data.length + ')');

            node.tag.num_tables = p_return.v_data.length;

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node = node.createChildNode(p_return.v_data[i].v_name,
                    false, 'fas node-all fa-eye node-view', {
                        type: 'view',
                        has_triggers: p_return.v_data[i].v_has_triggers
                    }, 'cm_view',null,false);
                v_node.createChildNode('', false,
                    'node-spin', {
                        type: 'view_field'
                    }, null,null,false);
            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);
        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving View Columns.
/// </summary>
/// <param name="node">Node object.</param>
function getViewsColumnsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_views_columns_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_table": node.text,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            v_list = node.createChildNode('Columns (' + p_return.v_data.length +
                ')', false, 'fas node-all fa-columns node-column', null,
                null,null,false);

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node = v_list.createChildNode(p_return.v_data[i].v_column_name,
                    false, 'fas node-all fa-columns node-column', {
                        type: 'table_field'
                    }, null,null,false);
                v_node.createChildNode('Type: ' + p_return.v_data[i].v_data_type,
                    false, 'fas node-all fa-ellipsis-h node-bullet',
                    null, null,null,false);

            }

            if (node.tag.has_rules) {
                v_node = node.createChildNode('Rules', false,
                    'fas node-all fa-lightbulb node-rule', {
                        type: 'rule_list'
                    }, 'cm_rules',null,false);
                v_node.createChildNode('', false,
                    'node-spin', null, null,null,false);
            }

            if (node.tag.has_triggers) {
                v_node = node.createChildNode('Triggers', false,
                    'fas node-all fa-bolt node-trigger', {
                        type: 'trigger_list'
                    }, 'cm_view_triggers',null,false);
                v_node.createChildNode('', false,
                    'node-spin', null, null,null,false);
            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving view definition.
/// </summary>
/// <param name="node">Node object.</param>
function getViewDefinitionOracle(node) {

    execAjax('/get_view_definition_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_view": node.text,
            "p_schema": null
        }),
        function(p_return) {

            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .setValue(p_return.v_data);
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .clearSelection();
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .gotoLine(0, 0, true);
            //v_connTabControl.selectedTab.tag.tabControl.selectedTab.renameTab(node.text);
            renameTabConfirm(v_connTabControl.selectedTab.tag.tabControl.selectedTab,
                node.text);

            var v_div_result = v_connTabControl.selectedTab.tag.tabControl.selectedTab
                .tag.div_result;

            if (v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                .ht != null) {
                v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                    .ht.destroy();
                v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                    .ht = null;
            }

            v_div_result.innerHTML = '';

            maximizeEditor();

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        true);

}

/*
/// <summary>
/// Retrieving materialized views.
/// </summary>
/// <param name="node">Node object.</param>
function getMaterializedViewsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_mviews_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            node.setText('Materialized Views (' + p_return.v_data.length +
                ')');

            node.tag.num_tables = p_return.v_data.length;

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node = node.createChildNode(p_return.v_data[i].v_name,
                    false, 'fas node-all fa-eye node-mview', {
                        type: 'mview'
                    }, 'cm_mview');
                v_node.createChildNode('', false,
                    'node-spin', {
                        type: 'mview_field'
                    }, null);
            }
        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving Materialized View Columns.
/// </summary>
/// <param name="node">Node object.</param>
function getMaterializedViewsColumnsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_mviews_columns_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_table": node.text,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node = node.createChildNode(p_return.v_data[i].v_column_name,
                    false, 'fas node-all fa-columns node-column', {
                        type: 'table_field'
                    }, null);
                v_node.createChildNode('Type: ' + p_return.v_data[i].v_data_type,
                    false, 'fas node-all fa-ellipsis-h node-bullet',
                    null, null);

            }

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving materialized view definition.
/// </summary>
/// <param name="node">Node object.</param>
function getMaterializedViewDefinitionOracle(node) {

    execAjax('/get_mview_definition_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_view": node.text,
            "p_schema": null
        }),
        function(p_return) {

            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .setValue(p_return.v_data);
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .clearSelection();
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .gotoLine(0, 0, true);
            //v_connTabControl.selectedTab.tag.tabControl.selectedTab.renameTab(node.text);
            renameTabConfirm(v_connTabControl.selectedTab.tag.tabControl.selectedTab,
                node.text);
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.sel_filtered_data
                .value = 1;

            var v_div_result = v_connTabControl.selectedTab.tag.tabControl.selectedTab
                .tag.div_result;

            if (v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                .ht != null) {
                v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                    .ht.destroy();
                v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                    .ht = null;
            }

            v_div_result.innerHTML = '';

            maximizeEditor();

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        true);

}
*/

/// <summary>
/// Retrieving columns.
/// </summary>
/// <param name="node">Node object.</param>
function getColumnsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_columns_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_table": node.text,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            v_list = node.createChildNode('Columns (' + p_return.v_data.length +
                ')', false, 'fas node-all fa-columns node-column', {
                    type: 'column_list'
                }, 'cm_columns',null,false);

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node = v_list.createChildNode(p_return.v_data[i].v_column_name,
                    false, 'fas node-all fa-columns node-column', {
                        type: 'table_field'
                    }, 'cm_column',null,false);
                v_node.createChildNode('Type: ' + p_return.v_data[i].v_data_type,
                    false, 'fas node-all fa-ellipsis-h node-bullet',
                    null, null,null,false);
                v_node.createChildNode('Nullable: ' + p_return.v_data[i].v_nullable,
                    false, 'fas node-all fa-ellipsis-h node-bullet',
                    null, null,null,false);

            }

            if (node.tag.has_primary_keys) {
                v_node = node.createChildNode('Primary Key', false,
                    'fas node-all fa-key node-pkey', {
                        type: 'primary_key'
                    }, 'cm_pks',null,false);
                v_node.createChildNode('', false,
                    'node-spin', null, null,null,false);
            }

            if (node.tag.has_foreign_keys) {
                v_node = node.createChildNode('Foreign Keys', false,
                    'fas node-all fa-key node-fkey', {
                        type: 'foreign_keys'
                    }, 'cm_fks',null,false);
                v_node.createChildNode('', false,
                    'node-spin', null, null,null,false);
            }

            if (node.tag.has_uniques) {
                v_node = node.createChildNode('Uniques', false,
                    'fas node-all fa-key node-unique', {
                        type: 'uniques'
                    }, 'cm_uniques',null,false);
                v_node.createChildNode('', false,
                    'node-spin', null, null,null,false);
            }

            if (node.tag.has_indexes) {
                v_node = node.createChildNode('Indexes', false,
                    'fas node-all fa-thumbtack node-index', {
                        type: 'indexes'
                    }, 'cm_indexes',null,false);
                v_node.createChildNode('', false,
                    'node-spin', null, null,null,false);
            }

            if (node.tag.has_triggers) {
                v_node = node.createChildNode('Triggers', false,
                    'fas node-all fa-bolt node-trigger', {
                        type: 'trigger_list'
                    }, 'cm_triggers',null,false);
                v_node.createChildNode('', false,
                    'node-spin', null, null,null,false);
            }

            if (node.tag.has_partitions) {
                v_node = node.createChildNode('Partitions', false,
                    'fas node-all fa-table node-partition', {
                        type: 'partition_list'
                    }, 'cm_partitions',null,false);
                v_node.createChildNode('', false,
                    'node-spin', null, null,null,false);
            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving PKs.
/// </summary>
/// <param name="node">Node object.</param>
function getPKOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_pk_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_table": node.parent.text,
            "p_schema": null
        }),
        function(p_return) {

            node.setText('Primary Key (' + p_return.v_data.length + ')');

            if (node.childNodes.length > 0) {
                node.removeChildNodes();
                //node.contextMenu = 'cm_refresh'
            } else {
                //node.contextMenu = 'cm_pks'
            }

            if (p_return.v_data.length > 0) {
                v_node = node.createChildNode(p_return.v_data[0][0], false,
                    'fas node-all fa-key node-pkey', {
                        type: 'pk'
                    }, 'cm_pk');
                v_node.createChildNode('', false,
                    'node-spin', {
                        type: 'pk_field'
                    }, null);
            }

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving PKs Columns.
/// </summary>
/// <param name="node">Node object.</param>
function getPKColumnsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_pk_columns_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_key": node.text,
            "p_table": node.parent.parent.text,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node.createChildNode(p_return.v_data[i][0], false,
                    'fas node-all fa-columns node-column', null, null,null,false);

            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving Uniques.
/// </summary>
/// <param name="node">Node object.</param>
function getUniquesOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_uniques_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_table": node.parent.text,
            "p_schema": null
        }),
        function(p_return) {

            node.setText('Uniques (' + p_return.v_data.length + ')');

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            if (p_return.v_data.length > 0) {

                for (i = 0; i < p_return.v_data.length; i++) {

                    v_node = node.createChildNode(p_return.v_data[i][0],
                        false,
                        'fas node-all fa-key node-unique', {
                            type: 'unique'
                        }, 'cm_unique',null,false);

                    v_node.createChildNode('', false,
                        'node-spin', {
                            type: 'unique_field'
                        }, null,null,false);

                }

                node.drawChildNodes();

            }

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving Uniques Columns.
/// </summary>
/// <param name="node">Node object.</param>
function getUniquesColumnsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_uniques_columns_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_unique": node.text,
            "p_table": node.parent.parent.text,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            if (p_return.v_data.length > 0) {

                for (i = 0; i < p_return.v_data.length; i++) {

                    node.createChildNode(p_return.v_data[i][0], false,
                        'fas node-all fa-columns node-column', null, null,null,false
                    );

                }

                node.drawChildNodes();

            }

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving Indexes.
/// </summary>
/// <param name="node">Node object.</param>
function getIndexesOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_indexes_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_table": node.parent.text,
            "p_schema": null
        }),
        function(p_return) {

            node.setText('Indexes (' + p_return.v_data.length + ')');

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            var v_node;

            if (p_return.v_data.length > 0) {

                for (i = 0; i < p_return.v_data.length; i++) {

                    v_node = node.createChildNode(p_return.v_data[i][0] +
                        ' (' + p_return.v_data[i][1] + ')', false,
                        'fas node-all fa-thumbtack node-index', {
                            type: 'index'
                        }, 'cm_index',null,false);

                    v_node.createChildNode('', false,
                        'node-spin', {
                            type: 'index_field'
                        }, null,null,false);

                }

                node.drawChildNodes();

            }

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving Indexes Columns.
/// </summary>
/// <param name="node">Node object.</param>
function getIndexesColumnsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_indexes_columns_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_index": node.text.replace(' (Non Unique)', '').replace(
                ' (Unique)', ''),
            "p_table": node.parent.parent.text,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            if (p_return.v_data.length > 0) {

                for (i = 0; i < p_return.v_data.length; i++) {

                    node.createChildNode(p_return.v_data[i][0], false,
                        'fas node-all fa-columns node-column', null, null,null,false
                    );

                }

                node.drawChildNodes();

            }

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving FKs.
/// </summary>
/// <param name="node">Node object.</param>
function getFKsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_fks_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_table": node.parent.text,
            "p_schema": null
        }),
        function(p_return) {

            node.setText('Foreign Keys (' + p_return.v_data.length + ')');

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node = node.createChildNode(p_return.v_data[i][0],
                    false,
                    'fas node-all fa-key node-fkey', {
                        type: 'foreign_key'
                    }, 'cm_fk',null,false);
                v_node.createChildNode('Referenced Table: ' + p_return.v_data[
                        i][1], false,
                    'fas node-all fa-table node-table', null,
                    null,null,false);
                v_node.createChildNode('Delete Rule: ' + p_return.v_data[
                        i][2], false,
                    'fas node-all fa-ellipsis-h node-bullet',
                    null, null,null,false);
                v_node.createChildNode('Update Rule: ' + p_return.v_data[
                        i][3], false,
                    'fas node-all fa-ellipsis-h node-bullet',
                    null, null,null,false);

                v_curr_fk = p_return.v_data[i][0];

            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving FKs Columns.
/// </summary>
/// <param name="node">Node object.</param>
function getFKsColumnsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_fks_columns_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_fkey": node.text,
            "p_table": node.parent.parent.text,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            node.createChildNode('Referenced Table: ' + p_return.v_data[
                    0][0], false,
                'fas node-all fa-table node-table', null,
                null,null,false);
            node.createChildNode('Delete Rule: ' + p_return.v_data[
                    0][1], false,
                'fas node-all fa-ellipsis-h node-bullet',
                null, null,null,false);
            node.createChildNode('Update Rule: ' + p_return.v_data[
                    0][2], false,
                'fas node-all fa-ellipsis-h node-bullet',
                null, null,null,false);

            for (i = 0; i < p_return.v_data.length; i++) {

                node.createChildNode(p_return.v_data[i][3] +
                    " <i class='fas node-all fa-arrow-right'></i> " +
                    p_return.v_data[i][4], false,
                    'fas node-all fa-columns node-column', null, null,null,false);

            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/*
/// <summary>
/// Retrieving Triggers.
/// </summary>
/// <param name="node">Node object.</param>
function getTriggersOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_triggers_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_table": node.parent.text,
            "p_schema": null
        }),
        function(p_return) {

            node.setText('Triggers (' + p_return.v_data.length + ')');

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            var v_node;

            if (p_return.v_data.length > 0) {

                for (i = 0; i < p_return.v_data.length; i++) {

                    v_node = node.createChildNode(p_return.v_data[i][0],
                        false, 'fas node-all fa-bolt node-trigger', {
                            type: 'trigger'
                        }, 'cm_trigger');
                    v_node.createChildNode('Enabled: ' + p_return.v_data[i]
                        [1], false,
                        'fas node-all fa-ellipsis-h node-bullet',
                        null, null);
                    v_node.createChildNode('Function: ' + p_return.v_data[i]
                        [2], false,
                        'fas node-all fa-ellipsis-h node-bullet',
                        null, null);

                }

            }

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving Partitions.
/// </summary>
/// <param name="node">Node object.</param>
function getPartitionsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_partitions_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_table": node.parent.text,
            "p_schema": null
        }),
        function(p_return) {

            node.setText('Partitions (' + p_return.v_data.length + ')');

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            var v_node;

            if (p_return.v_data.length > 0) {

                for (i = 0; i < p_return.v_data.length; i++) {

                    v_node = node.createChildNode(p_return.v_data[i][0],
                        false,
                        'fas node-all fa-table node-partition', {
                            type: 'partition'
                        }, 'cm_partition');

                }

            }

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}
*/

/// <summary>
/// Retrieving functions.
/// </summary>
/// <param name="node">Node object.</param>
function getFunctionsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);


    execAjax('/get_functions_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            node.setText('Functions (' + p_return.v_data.length + ')');

            node.tag.num_tables = p_return.v_data.length;

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node = node.createChildNode(p_return.v_data[i].v_name,
                    false, 'fas node-all fa-cog node-function', {
                        type: 'function',
                        id: p_return.v_data[i].v_id
                    }, 'cm_function',null,false);
                v_node.createChildNode('', false,
                    'node-spin', {
                        type: 'function_field'
                    }, null,null,false);

            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving function fields.
/// </summary>
/// <param name="node">Node object.</param>
function getFunctionFieldsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_function_fields_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_function": node.tag.id,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            node.tag.num_tables = p_return.v_data.length;

            for (i = 0; i < p_return.v_data.length; i++) {

                if (p_return.v_data[i].v_type == 'O')
                    v_node = node.createChildNode(p_return.v_data[i].v_name,
                        false, 'fas node-all fa-arrow-right node-function-field', null,
                        null,null,false);
                else {
                    if (p_return.v_data[i].v_type == 'I')
                        v_node = node.createChildNode(p_return.v_data[i].v_name,
                            false, 'fas node-all fa-arrow-left node-function-field',
                            null, null,null,false);
                    else
                        v_node = node.createChildNode(p_return.v_data[i].v_name,
                            false,
                            'fas node-all fa-exchange-alt node-function-field',
                            null, null,null,false);
                }

            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving function definition.
/// </summary>
/// <param name="node">Node object.</param>
/*function getDebugFunctionDefinitionOracle(node) {

    execAjax('/get_function_debug_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_function": node.tag.id
        }),
        function(p_return) {

            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .setValue(p_return.v_data);
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .clearSelection();
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .gotoLine(0, 0, true);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        true);

}*/

/// <summary>
/// Retrieving function definition.
/// </summary>
/// <param name="node">Node object.</param>
function getFunctionDefinitionOracle(node) {

    execAjax('/get_function_definition_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_function": node.tag.id
        }),
        function(p_return) {

            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .setValue(p_return.v_data);
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .clearSelection();
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .gotoLine(0, 0, true);
            //v_connTabControl.selectedTab.tag.tabControl.selectedTab.renameTab(node.text);
            renameTabConfirm(v_connTabControl.selectedTab.tag.tabControl.selectedTab,
                node.text);

            var v_div_result = v_connTabControl.selectedTab.tag.tabControl.selectedTab
                .tag.div_result;

            if (v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                .ht != null) {
                v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                    .ht.destroy();
                v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                    .ht = null;
            }

            v_div_result.innerHTML = '';

            maximizeEditor();

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        true);

}

/// <summary>
/// Retrieving procedures.
/// </summary>
/// <param name="node">Node object.</param>
function getProceduresOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);


    execAjax('/get_procedures_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            node.setText('Procedures (' + p_return.v_data.length + ')');

            node.tag.num_tables = p_return.v_data.length;

            for (i = 0; i < p_return.v_data.length; i++) {

                v_node = node.createChildNode(p_return.v_data[i].v_name,
                    false, 'fas node-all fa-cog node-procedure', {
                        type: 'procedure',
                        id: p_return.v_data[i].v_id
                    }, 'cm_procedure',null,false);
                v_node.createChildNode('', false,
                    'node-spin', {
                        type: 'procedure_field'
                    }, null,null,false);

            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving procedure fields.
/// </summary>
/// <param name="node">Node object.</param>
function getProcedureFieldsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    execAjax('/get_procedure_fields_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_procedure": node.tag.id,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            node.tag.num_tables = p_return.v_data.length;

            for (i = 0; i < p_return.v_data.length; i++) {

                if (p_return.v_data[i].v_type == 'O')
                    v_node = node.createChildNode(p_return.v_data[i].v_name,
                        false, 'fas node-all fa-arrow-right node-function-field', null,
                        null,null,false);
                else {
                    if (p_return.v_data[i].v_type == 'I')
                        v_node = node.createChildNode(p_return.v_data[i].v_name,
                            false, 'fas node-all fa-arrow-left node-function-field',
                            null, null,null,false);
                    else
                        v_node = node.createChildNode(p_return.v_data[i].v_name,
                            false,
                            'fas node-all fa-exchange-alt node-function-field',
                            null, null,null,false);
                }

            }

            node.drawChildNodes();

            afterNodeOpenedCallbackOracle(node);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving procedure definition.
/// </summary>
/// <param name="node">Node object.</param>
/*function getDebugProcedureDefinitionOracle(node) {

    execAjax('/get_function_debug_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_function": node.tag.id
        }),
        function(p_return) {

            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .setValue(p_return.v_data);
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .clearSelection();
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .gotoLine(0, 0, true);

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        true);

}*/

/// <summary>
/// Retrieving procedure definition.
/// </summary>
/// <param name="node">Node object.</param>
function getProcedureDefinitionOracle(node) {

    execAjax('/get_procedure_definition_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_procedure": node.tag.id
        }),
        function(p_return) {

            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .setValue(p_return.v_data);
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .clearSelection();
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .gotoLine(0, 0, true);
            //v_connTabControl.selectedTab.tag.tabControl.selectedTab.renameTab(node.text);
            renameTabConfirm(v_connTabControl.selectedTab.tag.tabControl.selectedTab,
                node.text);

            var v_div_result = v_connTabControl.selectedTab.tag.tabControl.selectedTab
                .tag.div_result;

            if (v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                .ht != null) {
                v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                    .ht.destroy();
                v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                    .ht = null;
            }

            v_div_result.innerHTML = '';

            maximizeEditor();

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        true);

}

/*
/// <summary>
/// Retrieving trigger functions.
/// </summary>
/// <param name="node">Node object.</param>
function getTriggerFunctionsOracle(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);


    execAjax('/get_triggerfunctions_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_schema": null
        }),
        function(p_return) {

            if (node.childNodes.length > 0)
                node.removeChildNodes();

            node.setText('Trigger Functions (' + p_return.v_data.length +
                ')');

            node.tag.num_tables = p_return.v_data.length;

            for (i = 0; i < p_return.v_data.length; i++) {

                node.createChildNode(p_return.v_data[i].v_name, false,
                    'fas node-all fa-cog node-tfunction', {
                        type: 'triggerfunction',
                        id: p_return.v_data[i].v_id
                    }, 'cm_triggerfunction');

            }

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        false);
}

/// <summary>
/// Retrieving trigger function definition.
/// </summary>
/// <param name="node">Node object.</param>
function getTriggerFunctionDefinitionOracle(node) {

    execAjax('/get_triggerfunction_definition_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_function": node.tag.id
        }),
        function(p_return) {

            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .setValue(p_return.v_data);
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .clearSelection();
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.editor
                .gotoLine(0, 0, true);
            //v_connTabControl.selectedTab.tag.tabControl.selectedTab.renameTab(node.text);
            renameTabConfirm(v_connTabControl.selectedTab.tag.tabControl.selectedTab,
                node.text);
            v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag.sel_filtered_data
                .value = 1;

            var v_div_result = v_connTabControl.selectedTab.tag.tabControl.selectedTab
                .tag.div_result;

            if (v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                .ht != null) {
                v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                    .ht.destroy();
                v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag
                    .ht = null;
            }

            v_div_result.innerHTML = '';

            maximizeEditor();

        },
        function(p_return) {
            nodeOpenError(p_return, node);
        },
        'box',
        true);

}
*/

/// <summary>
/// Retrieving SELECT SQL template.
/// </summary>
function TemplateSelectOracle(p_schema, p_table) {

    execAjax('/template_select_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_tab_id": v_connTabControl.selectedTab.id,
            "p_table": p_table,
            "p_schema": p_schema
        }),
        function(p_return) {
            v_connTabControl.tag.createQueryTab(
                p_schema + '.' + p_table);

            v_connTabControl.selectedTab
                .tag.tabControl.selectedTab
                .tag.editor.setValue(p_return.v_data.v_template);
            v_connTabControl.selectedTab
                .tag.tabControl.selectedTab
                .tag.editor.clearSelection();
            renameTabConfirm(
                v_connTabControl.selectedTab
                .tag.tabControl.selectedTab,
                p_schema + '.' + p_table);

            //minimizeEditor();

            querySQL(0);
        },
        function(p_return) {
            showError(p_return.v_data);
            return '';
        },
        'box',
        true);
}

/// <summary>
/// Retrieving INSERT SQL template.
/// </summary>
function TemplateInsertOracle(p_schema, p_table) {

    execAjax('/template_insert_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_tab_id": v_connTabControl.selectedTab.id,
            "p_table": p_table,
            "p_schema": p_schema
        }),
        function(p_return) {
          tabSQLTemplate(
              'Insert ' + p_schema + '.' + p_table,
              p_return.v_data.v_template);
        },
        function(p_return) {
            showError(p_return.v_data);
            return '';
        },
        'box',
        true);
}

/// <summary>
/// Retrieving UPDATE SQL template.
/// </summary>
function TemplateUpdateOracle(p_schema, p_table) {

    execAjax('/template_update_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_tab_id": v_connTabControl.selectedTab.id,
            "p_table": p_table,
            "p_schema": p_schema
        }),
        function(p_return) {
          tabSQLTemplate(
              'Update ' + p_schema + '.' + p_table,
              p_return.v_data.v_template);
        },
        function(p_return) {
            showError(p_return.v_data);
            return '';
        },
        'box',
        true);
}

function nodeOpenError(p_return, p_node) {

    if (p_return.v_data.password_timeout) {
        p_node.collapseNode();
        showPasswordPrompt(
            v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
            function() {
                p_node.expandNode();
            },
            null,
            p_return.v_data.message
        );
    } else {

        if (p_node.childNodes.length > 0)
            p_node.removeChildNodes();

        v_node = p_node.createChildNode(
            "Error - <a class='a_link' onclick='showError(&quot;" +
            p_return.v_data.replace(/\n/g, "<br/>").replace(/"/g, '') +
            "&quot;)'>View Detail</a>", false,
            'fas fa-times node-error', {
                type: 'error',
                message: p_return.v_data
            }, null);
    }

}

/*function getMajorVersionOracle(p_version) {
    var v_version = p_version.split(' (')[0]
    var tmp = v_version.replace('PostgreSQL ', '').replace('beta', '.').split(
        '.')
    tmp.pop()
    return tmp.join('.')
}*/

function oracleTerminateBackendConfirm(p_pid) {
    execAjax('/kill_backend_oracle/',
        JSON.stringify({
            "p_database_index": v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
"p_tab_id": v_connTabControl.selectedTab.id,
            "p_pid": p_pid
        }),
        function(p_return) {

            refreshMonitoring();

        },
        function(p_return) {
            if (p_return.v_data.password_timeout) {
                showPasswordPrompt(
                    v_connTabControl.selectedTab.tag.selectedDatabaseIndex,
                    function() {
                        oracleTerminateBackendConfirm(p_pid);
                    },
                    null,
                    p_return.v_data.message
                );
            } else {
                showError(p_return.v_data);
            }
        },
        'box',
        true);

}

function oracleTerminateBackend(p_row) {

    var v_pid = p_row[1] + ',' + p_row[2];

    showConfirm('Are you sure you want to terminate session ' + v_pid + '?',
        function() {

            oracleTerminateBackendConfirm(v_pid);

        });

}
