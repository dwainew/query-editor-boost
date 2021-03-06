'use strict';

import * as vscode from 'vscode';

export async function initQEB() {
    var theSettings = vscode.workspace.getConfiguration();

    await initServerDashboard(theSettings);
    await initDatabaseDashboard(theSettings);

}

export async function uninstallQEB() {
    var theSettings = vscode.workspace.getConfiguration();

    await uninstallServerDashboard(theSettings);
    await uninstallDatabaseDashboard(theSettings);
    vscode.window.showInformationMessage("QE Boost: Dashboard settings have been uninstalled.");
}

async function initDatabaseDashboard(theConfig: vscode.WorkspaceConfiguration) {
    let dashboardDatabaseWidgets = [
        {
            "name": "Tasks",
            "gridItemConfig": {
                "sizex": 1,
                "sizey": 2
            },
            "widget": {
                "tasks-widget": [
                    "dsk.newqueryoption",
                    "mssqlCluster.task.newNotebook",
                    {
                        "name": "backup",
                        "when": "!mssql:iscloud"
                    },
                    {
                        "name": "restore",
                        "when": "!mssql:iscloud"
                    },
                    "configureDashboard"
                ]
            }
        },
        {
            "name": "Search",
            "gridItemConfig": {
                "sizex": 1,
                "sizey": 2
            },
            "widget": {
                "explorer-widget": {}
            }
        }
    ];

    if (theConfig.has('dashboard.database.widgets')) {
        let dashWidgetSettings: { widget: object, name: string, gridItemConfig?: object }[] = theConfig.get('dashboard.database.widgets');
        for (var i = 0; i < dashWidgetSettings.length; i++) {
            if (dashWidgetSettings[i].name && dashWidgetSettings[i].name == "Tasks") {
                let tasksList: string[];
                let qppTasks: string[] = ["dsk.newqueryoption"];
                tasksList = dashWidgetSettings[i].widget["tasks-widget"];
                if (tasksList.indexOf('dsk.newqueryoption') == -1) {
                    for (var j = 0; j < tasksList.length; j++) {
                        if (tasksList[j] != "newQuery") {
                            qppTasks.push(tasksList[j]);
                        }
                    }
                    dashWidgetSettings[i].widget["tasks-widget"] = qppTasks;
                }
            }
        }
        theConfig.update('dashboard.database.widgets', dashWidgetSettings, vscode.ConfigurationTarget.Global);
    } else {
        theConfig.update('dashboard.database.widgets', dashboardDatabaseWidgets, vscode.ConfigurationTarget.Global);
    }

}
async function initServerDashboard(theConfig: vscode.WorkspaceConfiguration) {
    let dashboardServerWidgets = [
        {
            "name": "Tasks",
            "widget": {
                "tasks-widget": [
                    "dsk.newqueryoption",
                    {
                        "name": "restore",
                        "when": "!mssql:iscloud"
                    },
                    "configureDashboard",
                    "newQuery",
                    "mssqlCluster.task.newNotebook"
                ]
            },
            "gridItemConfig": {
                "sizex": 1,
                "sizey": 2
            }
        },
        {
            "name": "Search",
            "gridItemConfig": {
                "sizex": 1,
                "sizey": 2
            },
            "widget": {
                "explorer-widget": {}
            }
        },
        {
            "widget": {
                "backup-history-server-insight": null
            }
        },
        {
            "widget": {
                "all-database-size-server-insight": null
            }
        }];

    if (theConfig.has('dashboard.server.widgets')) {
        let dashWidgetSettings: { widget: object, name: string, gridItemConfig?: object }[] = theConfig.get('dashboard.server.widgets');
        for (var i = 0; i < dashWidgetSettings.length; i++) {
            if (dashWidgetSettings[i].name && dashWidgetSettings[i].name == "Tasks") {
                let tasksList: string[];
                let qppTasks: string[] = ["dsk.newqueryoption"];
                tasksList = dashWidgetSettings[i].widget["tasks-widget"];
                if (tasksList.indexOf('dsk.newqueryoption') == -1) {
                    for (var j = 0; j < tasksList.length; j++) {
                        if (tasksList[j] != "newQuery") {
                            qppTasks.push(tasksList[j]);
                        }
                    }
                    dashWidgetSettings[i].widget["tasks-widget"] = qppTasks;
                }
            }
        }
        theConfig.update('dashboard.server.widgets', dashWidgetSettings, vscode.ConfigurationTarget.Global);
    } else {
        theConfig.update('dashboard.server.widgets', dashboardServerWidgets, vscode.ConfigurationTarget.Global);
    }
}


async function uninstallDatabaseDashboard(theConfig: vscode.WorkspaceConfiguration) {
    if (theConfig.has('dashboard.database.widgets')) {
        let dashWidgetSettings: { widget: object, name: string, gridItemConfig?: object }[] = theConfig.get('dashboard.database.widgets');
        for (var i = 0; i < dashWidgetSettings.length; i++) {
            if (dashWidgetSettings[i].name && dashWidgetSettings[i].name == "Tasks") {
                let tasksList: string[];
                let qppTasks: string[] = ["newQuery"]; //["dsk.newqueryoption"];
                tasksList = dashWidgetSettings[i].widget["tasks-widget"];
                if (tasksList.indexOf('newQuery') == -1) {
                    for (var j = 0; j < tasksList.length; j++) {
                        if (tasksList[j] != "dsk.newqueryoption") {
                            qppTasks.push(tasksList[j]);
                        }
                    }
                    dashWidgetSettings[i].widget["tasks-widget"] = qppTasks;
                }
            }
        }
        theConfig.update('dashboard.database.widgets', dashWidgetSettings, vscode.ConfigurationTarget.Global);
    }
}

async function uninstallServerDashboard(theConfig: vscode.WorkspaceConfiguration) {
    if (theConfig.has('dashboard.server.widgets')) {
        let dashWidgetSettings: { widget: object, name: string, gridItemConfig?: object }[] = theConfig.get('dashboard.server.widgets');
        for (var i = 0; i < dashWidgetSettings.length; i++) {
            if (dashWidgetSettings[i].name && dashWidgetSettings[i].name == "Tasks") {
                let tasksList: string[];
                let qppTasks: string[] = ["newQuery"]; //["dsk.newqueryoption"];
                tasksList = dashWidgetSettings[i].widget["tasks-widget"];
                if (tasksList.indexOf('newQuery') == -1) {
                    for (var j = 0; j < tasksList.length; j++) {
                        if (tasksList[j] != "dsk.newqueryoption") {
                            qppTasks.push(tasksList[j]);
                        }
                    }
                    dashWidgetSettings[i].widget["tasks-widget"] = qppTasks;
                }
            }
        }
        theConfig.update('dashboard.server.widgets', dashWidgetSettings, vscode.ConfigurationTarget.Global);
    }
}

