const { electron, app, BrowserWindow, Menu, session, dialog, ipcMain } = require('electron');
const path = require('path');
const { URL } = require('url');
const isDev = require('electron-is-dev');
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");

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
    mainWindow = new BrowserWindow({ width: 1400, height: 960, autoHideMenuBar: false, frame: false, show: false });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function () { mainWindow = null });
    session.defaultSession.allowNTLMCredentialsForDomains('*');
    session.defaultSession.clearStorageData([], null);

    //mainWindow.webContents.on('before-input-event', function () { console.log('input'); });

    mainWindow.webContents.once('did-finish-load', () => { 
        
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();

        if (isDev) {
            mainWindow.webContents.openDevTools();
            mainWindow.webContents.send('NoUpdate', 'DEV run.  No update needed.');
        } else {
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
        //fix for before unload confirmations. These are not supported in electron per google specs. This catches that event and shows a prompt instead of just doing nothing and forcing the user to stay on the page
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
