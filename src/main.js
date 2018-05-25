const { electron, app, BrowserWindow, Menu, session, dialog, ipcMain } = require('electron');
const settings = require('electron-settings');
const path = require('path');
const { URL } = require('url');
const isDev = require('electron-is-dev');
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");

let loadingWindow;
let mainWindow;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
global.credentials = { username: '', password: '', SRMUsername: 'ricky_jett@reyrey.com', SRMPassword: 'Reynolds1!' };

app.setAppUserModelId('NLM Dashboard');

function sendStatusToWindow(type, text, logInfo=true) {
    if (logInfo) {
        log.info(text);
    }

    mainWindow.webContents.send(type, text);
}

app.on('ready', function () {
    var userName = process.env['USERPROFILE'].split(path.sep)[2];
    global.credentials.username = userName;

    loadingWindow = new BrowserWindow({ width: 640, height: 480, autoHideMenuBar: true, frame: false, show: false });
    loadingWindow.loadURL('file://' + __dirname + '/loading.html');
    mainWindow = new BrowserWindow({ width: 1400, height: 960, autoHideMenuBar: false, frame: false, show: false });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    loadingWindow.on('closed', () => { loadingWindow = null });
    mainWindow.on('closed', function () { mainWindow = null });
    session.defaultSession.allowNTLMCredentialsForDomains('*');
    session.defaultSession.clearStorageData([], null);
    loadingWindow.webContents.on('did-finish-load', () => { loadingWindow.show() });

    mainWindow.webContents.once('did-finish-load', () => {
        if (loadingWindow) {
            loadingWindow.close();
        }

        mainWindow.show();
        mainWindow.focus();

        if (isDev) {
            mainWindow.webContents.openDevTools();
            mainWindow.webContents.send('NoUpdate', 'DEV run.  No update needed.');
        } else {
            if (settings.get('userSettings.channel', 'latest') == 'latest') {
                autoUpdater.allowPrerelease = false;
                autoUpdater.allowDowngrade = true;
                autoUpdater.channel = 'latest';
            } else {
                autoUpdater.allowPrerelease = true;
                autoUpdater.channel = 'beta';
            }
            
            autoUpdater.checkForUpdatesAndNotify();
        }
    });
    
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

app.on('web-contents-created', function (webContentsCreatedEvent, contents) {
    if (contents.getType() === 'webview') {
        contents.on('will-prevent-unload', function (event) {
            let choice = dialog.showMessageBox(mainWindow, {
                type: 'question',
                buttons: ['Leave', 'Stay'],
                title: 'Do you want to leave this site?',
                message: 'Navigating to a new page will cause any unsaved changes to be discarded.',
                defaultId: 0,
                cancelId: 1
            });
            
            if (choice === 0) {
                event.preventDefault()
            }
        });
    }
});

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('UpdateCheck', 'Checking for update...');
})
autoUpdater.on('update-available', (info) => {
    settings.set('updateInfo.notes', info.releaseNotes);
    settings.set('updateInfo.version', info.version);
    sendStatusToWindow('UpdateAvailable', 'Update available.');
})
autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('NoUpdate', 'Update not available.');
})
autoUpdater.on('error', (err) => {
    sendStatusToWindow('UpdateError', 'Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow('DownloadProgress', progressObj.percent);
})
autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('UpdateDownloaded', 'Update downloaded');
});

ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
});

ipcMain.on('relaunchApp', (event, arg) => {
    app.relaunch();
    app.quit();
});
