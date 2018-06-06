import * as types from './constants';
var util = require('util');

const JavaScriptSnippets = {
    HWAP: "var form = $('#loginForm'); if (form.length > 0 && form.find('.error').length == 0) { form.find('[name = UserName]').val('%s'); form.find('[name = Password]').val('%s');form.submit(); }",
    MMS: "var form = jQuery('#form1'); if(form.length > 0) { form.find('input[id *= UserName]').val('%s'); form.find('input[id *= Password]').val('%s'); form.find('input[type=submit]').click();}",
    SRM: "$('input[id *= UserName]').val('%s'); $('input[id *= Password]').val('%s'); $('input[type=submit]').click();",
    Chatmeter: "var form = jQuery('form[name *= login]'); if(form.length > 0) { var username = form.find('input[id *= Username]'); username.val('%s'); username[0].dispatchEvent(new Event('input')); var password = form.find('input[id *= Password]'); password.val('%s'); password[0].dispatchEvent(new Event('input')); form.find('input[type=submit]').click();}",
    Kenshoo: "$('#email').val('%s'); $('[type=password]').val('%s'); $('[type=submit]').click();",
    Acquisio: "$('[name=username]').val('%s'); $('[name=password]').val('%s'); $('[type=submit]').click();",
    LeadsBridge: "$('#loginUsername').val('%s'); $('#loginPassword').val('%s');$('[type=submit]').click();",
    Raven: "$('#username').val('%s'); $('#password').val('%s');$('#form-submit').click();",
    Shortstack: "$('#user_session_login').val('%s'); $('#user_session_password').val('%s');$('[type=submit]').click();",
    Cyfe: "$('#email').val('%s'); $('#password').val('%s'); $('input[type=submit]').click();",
    Twitter: "$('.email-input').val('%s'); $('[type=password]').val('%s'); $('.js-submit').click();",
    Facebook: "document.getElementById('email').value = '%s'; document.getElementById('pass').value = '%s'; document.getElementById('u_0_2').click();",
    GoogleStep1: "var usernameInput = document.getElementById('identifierId'); if (usernameInput != undefined) {usernameInput.value= '%s'; document.getElementById('identifierNext').click();}",
    GoogleStep2: "var password = document.getElementsByName('password')[0]; if (password != undefined) {password.value = '%s'; document.getElementById('passwordNext').click();}",
    FlickrStep1: "document.getElementById('login-username').value = '%s'; document.getElementById('login-signin').click();",
    FlickrStep2: "document.getElementById('login-passwd').value = '%s'; document.getElementById('login-signin').click();",
    BingStep1: "var username = document.querySelectorAll('[name=loginfmt]:not(.moveOffScreen)'); if(username.length > 0) { username[0].value = '%s'; username[0].dispatchEvent(new Event('input')); document.querySelector('[type=submit]').click();  }",
    BingStep2: "var password = document.querySelectorAll('[name=passwd]:not(.moveOffScreen)'); if (password.length > 0) { password[0].value = '%s'; password[0].dispatchEvent(new Event('input')); document.querySelector('[type=submit]').click(); }",
}

export function AttemptLogin(pageUrl, app, contents, username, password) {
    switch (app.serviceType) {
        case types.ServiceTypes.Internal:
            switch (app.type) {
                case types.InternalServiceTypes.Aptus:
                    return validateLogin(pageUrl, app, contents, '/Account/LogOn', util.format(JavaScriptSnippets.HWAP, username, password));
                case types.InternalServiceTypes.Marketing:
                    return validateLogin(pageUrl, app, contents, '/Account/LogOn', util.format(JavaScriptSnippets.HWAP, username, password));
                case types.InternalServiceTypes.MMS:
                    return validateLogin(pageUrl, app, contents, '/Tools/AdvancedSearch.aspx', util.format(JavaScriptSnippets.MMS, username, password));
                default:
                    return false;
            }
        case types.ServiceTypes.External:
            switch (app.type) {
                case types.ExternalServiceTypes.Chatmeter:
                    return validateLogin(pageUrl, app, contents, '/', util.format(JavaScriptSnippets.Chatmeter, username, password));
                case types.ExternalServiceTypes.Kenshoo:
                    return validateLogin(pageUrl, app, contents, '/api/login', util.format(JavaScriptSnippets.Kenshoo, username, password));
                case types.ExternalServiceTypes.Acquisio:
                    return validateLogin(pageUrl, app, contents, '/', util.format(JavaScriptSnippets.Acquisio, username, password));
                case types.ExternalServiceTypes.LeadsBridge:
                    return validateLogin(pageUrl, app, contents, '/app/login', util.format(JavaScriptSnippets.LeadsBridge, username, password));
                case types.ExternalServiceTypes.Raven:
                    return validateLogin(pageUrl, app, contents, '/tools/m/login/', util.format(JavaScriptSnippets.Raven, username, password));
                case types.ExternalServiceTypes.Shortstack:
                    return validateLogin(pageUrl, app, contents, '/', util.format(JavaScriptSnippets.Shortstack, username, password));
                case types.ExternalServiceTypes.Cyfe:
                    return validateLogin(pageUrl, app, contents, '/login', util.format(JavaScriptSnippets.Cyfe, username, password));
                case types.ExternalServiceTypes.Twitter:
                    return validateLogin(pageUrl, app, contents, '/', util.format(JavaScriptSnippets.Twitter, username, password));
                case types.ExternalServiceTypes.Facebook:
                    return validateLogin(pageUrl, app, contents, '/', util.format(JavaScriptSnippets.Facebook, username, password));
                case types.ExternalServiceTypes.Bing:
                    if (app.loginStep === 0) {
                        return validateLogin(pageUrl, app, contents, '/login.srf', util.format(JavaScriptSnippets.BingStep1, username), false, true);
                    } else if (app.loginStep === 1) {
                        return validateLogin(pageUrl, app, contents, '/login.srf', util.format(JavaScriptSnippets.BingStep2, password), true, true);
                    }

                    return app.attemptedLogin;
                case types.ExternalServiceTypes.Google:
                case types.ExternalServiceTypes.GoogleAdwords:
                case types.ExternalServiceTypes.GoogleAnalytics:
                case types.ExternalServiceTypes.GooglePlus:
                    if (app.loginStep === 0) {
                        return validateLogin(pageUrl, app, contents, '/signin/v2/identifier', util.format(JavaScriptSnippets.GoogleStep1, username), false, true);
                    } else if (app.loginStep === 1) {
                        setTimeout(function () {
                            return validateLogin(pageUrl, app, contents, '/signin/v2/sl/pwd', util.format(JavaScriptSnippets.GoogleStep2, password), true, true);
                        }, 500);
                    }

                    return app.attemptedLogin;
                case types.ExternalServiceTypes.Flickr:
                    if (app.loginStep === 0) {
                        return validateLogin(pageUrl, app, contents, '/', util.format(JavaScriptSnippets.FlickrStep1, username), false, true);
                    } else if (app.loginStep === 1) {
                        setTimeout(function () {
                            return validateLogin(pageUrl, app, contents, '/account/challenge/password', util.format(JavaScriptSnippets.FlickrStep2, password), true, true);
                        }, 500);
                    }

                    return app.attemptedLogin;
                default:
                    return true;
            }
    }
}

function validateLogin(pageUrl, app, contents, pathname, snippet, attemptLogin = true, incrementLoginStep = false) {
    var valid = (pageUrl.pathname === pathname && !app.attemptedLogin);

    if (valid) {
        app.attemptedLogin = attemptLogin;

        if (incrementLoginStep) {
            app.loginStep += 1;
        }

        contents.executeJavaScript(snippet);
    }

    return app.attemptedLogin;
}