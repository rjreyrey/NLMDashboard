const { electron, app, BrowserWindow, Menu, session, dialog, ipcMain } = require('electron');
const path = require('path');
const { URL } = require('url');
const isDev = require('electron-is-dev');
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");
let mainWindow;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
global.credentials = { username: '', password: '' };
app.setAppUserModelId('NLM Dashboard');

log.info('App starting...');

function sendStatusToWindow(type, text, logInfo=true) {
    if (logInfo) {
        log.info(text);
    }

    mainWindow.webContents.send(type, text);
}

app.on('ready', function () {
    var userName = process.env['USERPROFILE'].split(path.sep)[2];
    var loginId = path.join("REYNOLDS", userName);
    global.credentials.username = userName;
    mainWindow = new BrowserWindow({ width: 1400, height: 960, autoHideMenuBar: false, frame: false });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function () { mainWindow = null });
    session.defaultSession.allowNTLMCredentialsForDomains('*');
    
    mainWindow.focus();
    //mainWindow.webContents.on('before-input-event', function () { console.log('input'); });

    mainWindow.webContents.once('did-finish-load', () => { 
        if (!isDev) {
            autoUpdater.checkForUpdatesAndNotify();
        } else {
            mainWindow.webContents.send('NoUpdate', 'DEV run.  No update needed.');
        }
    });

    //mainWindow.webContents.openDevTools()
})

// Quit when all windows are closed.
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
        //below keeps popups from displaying.  This catches new window events on a webview, prevents the 
        //new window from being created, then loads the requested url in the webview itself.
        contents.on('new-window', function (newWindowEvent, url) {
            newWindowEvent.preventDefault();
            contents.loadURL(url);
        });
        //below is a fix for before unload confirmations. These are not supported in electron per google specs
        //this catches that event and shows a prompt instead of just doing nothing and forcing the user to stay on the page
        contents.on('will-prevent-unload', function (event) {
            let choice = dialog.showMessageBox(mainWindow, {
                type: 'question',
                buttons: ['Leave', 'Stay'],
                title: 'Do you want to leave this site?',
                message: 'Changes you made may not be saved.',
                defaultId: 0,
                cancelId: 1
            });
            
            if (choice === 0) {
                event.preventDefault()
            }
        });

        contents.on('did-start-loading', function (event) {
            sendStatusToWindow('showSpinner', 'show spinner', false);
        });

        contents.on('did-stop-loading', function (event) {
            sendStatusToWindow('hideSpinner', 'hide spinner', false);
        });

        contents.on('did-finish-load', function (event) {
            var pageUrl = new URL(contents.getURL());
            if (pageUrl.hostname.indexOf('dealer.nakedlime.com' > 0) && (pageUrl.pathname == '/' || pageUrl.pathname.indexOf('LogOn') > 0)) {
                //this is HWAP
                contents.executeJavaScript("var form = $('#loginForm'); if (form.length > 0 && form.find('.error').length == 0) { form.find('[name=UserName]').val('" + global.credentials.username + "'); form.find('[name=Password]').val('" + global.credentials.password + "');form.submit(); }");
            }
            
        });
    }
});

ipcMain.on('resetControls', function (event) {
    sendStatusToWindow('resetControls', 'resetControls');
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
