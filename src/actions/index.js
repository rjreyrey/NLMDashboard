import * as types from '../actions/constants'
var util = require('util')
window.$ = global.jQuery = require('../../assets/js/jquery.min.js');

export const selectApplication = (app) => ({ type: types.APP_CLICK, payload: app })
export const increaseLoginStep = () => ({ type: types.INCREASE_LOGIN_STEP, payload: null })
export const addApplication = (name) => ({ type: types.ADD_APP, payload: name })
export const findAccount = (account, enterprise) => ({ type: types.ACCOUNT_FIND, payload: { account: account, enterprise: enterprise } })
export const activateSidebar = () => ({ type: types.ACTIVATE_SIDEBAR, payload: null })
export const refreshBrowserControls = (app) => ({ type: types.REFRESH_BROWSER_CONTROLS, payload: app })
export const navigateBack = (webview) => ({ type: types.NAVIGATE_BACK, payload: webview })
export const navigateForward = (webview) => ({ type: types.NAVIGATE_FORWARD, payload: webview })
export const navigateReload = (webview) => ({ type: types.NAVIGATE_RELOAD, payload: webview })
export const showSpinner = (id) => ({ type: types.SHOW_SPINNER, payload: id })
export const hideSpinner = (id) => ({ type: types.HIDE_SPINNER, payload: id })
export const showControls = (webview) => ({ type: types.SHOW_CONTROLS, payload: webview })
export const hideControls = (webview) => ({ type: types.HIDE_CONTROLS, payload: webview })
export const resetControls = (webview) => ({ type: types.RESET_CONTROLS, payload: webview })
export const disableControls = (webview) => ({ type: types.DISABLE_CONTROLS, payload: webview })
export const fetchServicesBegin = () => ({ type: types.FETCH_SERVICES_BEGIN })
export const fetchServicesSuccess = (services) => ({ type: types.FETCH_SERVICES_SUCCESS, payload: services })
export const addTab = (service) => ({ type: types.ADD_TAB, payload: service })
export const closeTab = (tab) => ({ type: types.CLOSE_TAB, payload: tab })
export const clickTab = (tab) => ({ type: types.CLICK_TAB, payload: tab })
export const updateTab = (title, id) => ({type: types.UPDATE_TAB, payload: { title: title, id: id } })
export const newWindowTab = (account, url) => ({ type: types.NEW_WINDOW_TAB, payload: { account: account, url: url } })
export const addWebview = (tab) => ({ type: types.ADD_WEBVIEW, payload: { tab } })
export const deleteWebview = (tab) => ({ type: types.DELETE_WEBVIEW, payload: { tab } })
export const setNewActiveApp = (apps) => ({ type: types.SET_NEW_ACTIVE_APP, payload: { apps } })
export const showEnterpriseSearch = () => ({ type: types.SEARCH_SHOW , payload: null })
export const hideEnterpriseSearch = () => ({ type: types.SEARCH_HIDE , payload: null })
export const searchBeginBranch = (name) => ({ type: types.SEARCH_BEGIN_BRANCH, payload: name })
export const searchSuccessBranch = (data) => ({ type: types.SEARCH_SUCCESS_BRANCH, payload: data })
export const showSettings = () => ({ type: types.SHOW_SETTINGS, payload: null })
export const toggleBetaChannel = () => ({ type: types.TOGGLE_BETA_CHANNEL, payload: null })
export const changeEnvironment = (env) => ({ type: types.CHANGE_ENVRIONMENT, payload: env })
export const closeSettings = () => ({ type: types.CLOSE_SETTINGS, payload: null })
export const relaunchApp = () => ({ type: types.RELAUNCH_APP, payload: null })


export function verifyUser(username, password) {
    return dispatch => {
        var params = util.format('CSSUserId=%s&Password=%s', username, password );
        var xhttp = new XMLHttpRequest();
        localStorage.username = username;
        localStorage.password = password;

        $('.loaderWrapper').removeClass('hide');

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var response = xhttp.responseXML.getElementsByTagName('string')[0].childNodes[0].nodeValue;

                    $('.loaderWrapper').addClass('hide');

                    if (response == 'Success') {
                        dispatch(fetchToken());

                        $('.loginPaneWrapper form').fadeOut(500, function () {
                            $('.innerContainer').fadeOut(500, function () {
                                $('.loginHeader').text('Loading');
                                $('.innerContainer').fadeIn(500, function () {
                                    $('.loginPaneWrapper').addClass('form-success');

                                    window.setTimeout(function () {
                                        $('.loginPaneWrapper').fadeOut(500, function () {
                                            dispatch(showEnterpriseSearch());
                                        });
                                    }, 2000);
                                });
                            });
                        });
                    } else {
                        $('#loginError').html(response).removeClass('hide');
                    }
                } else {
                    console.log(JSON.parse(this.response).ErrorMsg);
                }
            }
        };

        xhttp.open("POST", 'https://cssws.reyrey.com/ActiveDirectorySecurity.asmx/CSSAuthenticateUseridWithMessage', true, 'Cssclient', '1uw@hwyey');
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(params);
    };
}

export function fetchToken() {
    return dispatch => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var token = this.getResponseHeader('token');
                    localStorage.setItem('token', token);
                } else {
                    console.log(JSON.parse(this.response).ErrorMsg);
                }
            }
        };

        xhttp.open("POST", types.SERVICE_URL_AUTH_TOKEN, true);
        xhttp.setRequestHeader('Authorization', 'Basic ' + btoa(localStorage.username + ':' + localStorage.password));
        xhttp.send();
    };
}

export function fetchBranches(filters) {
    return dispatch => {
        dispatch(searchBeginBranch(filters));

        var url = util.format(types.SERVICE_URL_GET_BRANCHES, filters.branchName, filters.ID, localStorage.token);

        fetch(url)
            .then(res => res.json())
            .then(json => {
                dispatch(searchSuccessBranch(json));
            });
    };
}

export function fetchAccounts(name, sys, store, branch, enterpriseName) {
    return dispatch => {
        dispatch(searchBeginBranch(name));
        dispatch(findAccount(name, enterpriseName));
        var url = util.format(types.SERVICE_URL_GET_ACCOUNTS, encodeURIComponent(sys), store, branch, localStorage.token);

        fetch(url)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchServicesSuccess(json));
                dispatch(activateSidebar());
                dispatch(hideEnterpriseSearch());
            });
    };
}