// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer; 
window.$ = global.jQuery = require('../assets/js/jquery.min.js');
const title = $('#nlmTitle');

onload = () => {
    $('#loginUserName').val(remote.getGlobal('credentials').username);

    $('#installerUpdateButton').on('click', function () {
        ipcRenderer.send('quitAndInstall');
    });

    //////////////login functionality/////////////////////////////////
    $("#login-button").click(function (event) {
        event.preventDefault();

        var username = $('#loginUserName').val();
        var password = $('#loginPassword').val();

        if (username != '' && password != '') {
            $('#loginUserName').removeClass('error');
            $('#loginPassword').removeClass('error');

            $('.loaderWrapper').removeClass('hide');
            //do our ajax call here to CSS to verify the credentials
            $.ajax({
                type: "POST",
                url: "https://cssws.reyrey.com/ActiveDirectorySecurity.asmx/CSSAuthenticateUseridWithMessage",
                data: { CSSUserId: username, Password: password },
                username: 'Cssclient',
                password: '1uw@hwyey',
                success: function (data) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    $('.loaderWrapper').addClass('hide');
                    var response = $(data).find('string').text();

                    if (response == 'Success') {
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
                        $('#loginError').html(response).removeClass('hide');
                    }
                }
            })
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
}

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
    //////////////////////////////////////////////////////////////////