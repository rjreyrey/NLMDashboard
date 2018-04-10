// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer; 
window.$ = global.jQuery = require('../assets/js/jquery.min.js');

const title = $('#nlmTitle');


const webviews = document.querySelectorAll('webview');

$(function () {
    $('#loginUserName').val(remote.getGlobal('credentials').username);
});

onload = () => {
    var browserBack = $('.browserBack');
    var browserForward = $('.browserForward');
    var browserRefresh = $('.browserRefresh');

    webviews.forEach(function (view) {
        view.addEventListener('did-navigate', checkBrowserControls);
        view.addEventListener('new-window', newWindow);
    });

    //webview.addEventListener('did-navigate', checkBrowserControls)
    //webview.addEventListener('new-window', newWindow)

    browserBack.on('click', function (event) {
        var webview = document.querySelector('webview:not(.hide)');
        webview.goBack();
    });

    browserForward.on('click', function (event) {
        var webview = document.querySelector('webview:not(.hide)');
        webview.goForward();
    });

    browserRefresh.on('click', function (event) {
        var webview = document.querySelector('webview:not(.hide)');
        webview.reload();
    });
}

function checkBrowserControls(e) {
    var webview = document.querySelector('webview:not(.hide)');
    console.log('checking browser controls');

    var browserBack = $('.browserBack');
    var browserForward = $('.browserForward');
    var browserRefresh = $('.browserRefresh');

    if (webview.canGoBack()) {
        browserBack.removeClass('disabled')
    } else {
        browserBack.addClass('disabled')
    }

    if (webview.canGoForward()) {
        browserForward.removeClass('disabled')
    } else {
        browserForward.addClass('disabled')
    }

    browserRefresh.removeClass('disabled')

    $('.browserControls').removeClass('hidden');
}

function newWindow(event) {
    console.log('new window');
    event.preventDefault();
}

//////////////login functionality/////////////////////////////////
$("#login-button").click(function (event) {
    event.preventDefault();

    var username = $('#loginUserName').val();
    var password = $('#loginPassword').val();

    if (username != '' && password != '') {
        $('#loginUserName').removeClass('error');
        $('#loginPassword').removeClass('error');

        remote.getGlobal('credentials').username = username;
        remote.getGlobal('credentials').password = password;

        $('.loginPaneWrapper form').fadeOut(500, function () {
            $('.innerContainer').fadeOut(500, function () {
                $('.loginHeader').text('Loading');
                $('.innerContainer').fadeIn(500, function () {
                    $('.loginPaneWrapper').addClass('form-success');

                    window.setTimeout(function () {
                        $('.loginPaneWrapper').fadeOut(500, function () {
                            $('.sidebar').css('margin-left', '0px');
                        });
                    }, 2000);
                });
            });
        });
    } else {
        if (username == '') {
            $('#loginUserName').addClass('error').addClass('invalid');
            $('#loginUserName').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function (e) {
                    // code to execute after animation ends
                    $('#loginUserName').removeClass('invalid');
                });
        } else {
            $('#loginUserName').removeClass('error');
        }

        if (password == '') {
            $('#loginPassword').addClass('error').addClass('invalid');
            $('#loginPassword').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function (e) {
                    // code to execute after animation ends
                    $('#loginPassword').removeClass('invalid');
                });
        } else {
            $('#loginPassword').removeClass('error');
        }
    }
});
//////////////////////////////////////////////////////////////////
ipcRenderer.on('resetControls', function (event) {
    checkBrowserControls(event);
});

ipcRenderer.on('showSpinner', function (event, text) {
    var $spinner = $('#spinner');

    if ($spinner.hasClass('hide')) {
        $spinner.removeClass('hide');
    }
});

ipcRenderer.on('hideSpinner', function (event, text) {
    var $spinner = $('#spinner');

    if (!$spinner.hasClass('hide')) {
        $spinner.addClass('hide');
    }
});

/////////////////////auto updater/////////////////////////////////
var progressLoaded = false;

ipcRenderer.on('UpdateAvailable', function (event, text) {
    $('#AutoUpdater').find('h2').fadeOut(300, function (e) {
        $('#AutoUpdater').find('h2').text(text);
        $('#AutoUpdater').find('h2').fadeIn(300);
    });
});

ipcRenderer.on('NoUpdate', function (event, text) {
    $('#AutoUpdater').find('h2').fadeOut(700, function (e) {
        $('#AutoUpdater').addClass('hide');
        $('.innerContainer').animate({ 'margin-top': '0px' }, 500);
    });
});

ipcRenderer.on('UpdateError', function (event, text) {
    $('#AutoUpdater').find('h2').fadeOut(300, function (e) {
        $('#AutoUpdater').find('h2').text(text);
        $('#AutoUpdater').find('h2').fadeIn(300);
    });
});

ipcRenderer.on('DownloadProgress', function (event, text) {
    if (!progressLoaded) {
        $('#AutoUpdater').find('h2').fadeOut(300, function (e) {
            $('#AutoUpdater').find('h2').text('Downloading');
            $('#AutoUpdater').find('h2').fadeIn(300);
            $('.progress-bar').css('width', parseInt(text) + '%');
            $('.progress').removeClass('hide');
        });
        progressLoaded = true;
    } else {
        $('.progress-bar').css('width', parseInt(text) + '%');
    }
});

ipcRenderer.on('UpdateDownloaded', function (event, text) {
    $('#AutoUpdater').fadeOut(300, function (e) {
        $('#updaterInstaller').fadeIn(300);
    });
    
});

$('#installerUpdateButton').on('click', function () {
    ipcRenderer.send('quitAndInstall');
});
//////////////////////////////////////////////////////////////////