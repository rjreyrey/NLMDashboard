import * as types from '../actions/constants'
var util = require('util')

export const selectApplication = (app) => ({ type: types.APP_CLICK, payload: app })
export const addApplication = (name) => ({ type: types.ADD_APP, payload: name })
export const findAccount = (account) => ({ type: types.ACCOUNT_FIND, payload: account })
export const activateSidebar = () => ({ type: types.ACTIVATE_SIDEBAR, payload: null })
export const refreshBrowserControls = (app) => ({ type: types.REFRESH_BROWSER_CONTROLS, payload: app })
export const navigateBack = (webview) => ({ type: types.NAVIGATE_BACK, payload: webview })
export const navigateForward = (webview) => ({ type: types.NAVIGATE_FORWARD, payload: webview })
export const navigateReload = (webview) => ({ type: types.NAVIGATE_RELOAD, payload: webview })
export const showSpinner = () => ({ type: types.SHOW_SPINNER, payload: null })
export const hideSpinner = () => ({ type: types.HIDE_SPINNER, payload: null })
export const showControls = (webview) => ({ type: types.SHOW_CONTROLS, payload: webview })
export const hideControls = (webview) => ({ type: types.HIDE_CONTROLS, payload: webview })
export const resetControls = (webview) => ({ type: types.RESET_CONTROLS, payload: webview })
export const disableControls = (webview) => ({ type: types.DISABLE_CONTROLS, payload: webview })
export const fetchServicesBegin = () => ({ type: types.FETCH_SERVICES_BEGIN })
export const fetchServicesSuccess = (services) => ({ type: types.FETCH_SERVICES_SUCCESS, payload: services })
export const addTab = (service) => ({ type: types.ADD_TAB, payload: service })
export const closeTab = (tab) => ({ type: types.CLOSE_TAB, payload: tab })
export const clickTab = (tab) => ({ type: types.CLICK_TAB, payload: tab })
export const updateTab = (title) => ({ type: types.UPDATE_TAB, payload: title })
export const newWindowTab = (account, url) => ({ type: types.NEW_WINDOW_TAB, payload: { account: account, url: url } })
export const addWebview = (tab) => ({ type: types.ADD_WEBVIEW, payload: { tab } })
export const deleteWebview = (tab) => ({ type: types.DELETE_WEBVIEW, payload: { tab } })
export const setNewActiveApp = (apps) => ({ type: types.SET_NEW_ACTIVE_APP, payload: { apps } })
export const showEnterpriseSearch = () => ({ type: types.SEARCH_SHOW , payload: null })
export const hideEnterpriseSearch = () => ({ type: types.SEARCH_HIDE , payload: null })
export const searchBeginEnterprise = (filters) => ({ type: types.SEARCH_BEGIN_ENTERPRISE, payload: filters })
export const searchSuccessEnterprise = (data) => ({ type: types.SEARCH_SUCCESS_ENTERPRISE, payload: data })
export const searchBeginBranch = (name) => ({ type: types.SEARCH_BEGIN_BRANCH, payload: name })
export const searchSuccessBranch = (data) => ({ type: types.SEARCH_SUCCESS_BRANCH, payload: data })



export function fetchEnterprises(filters) {
    return dispatch => {
        dispatch(searchBeginEnterprise(filters));

        return new Promise(function (resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var token = this.getResponseHeader('token');
                        localStorage.setItem('token', token);

                        var url = util.format(types.SERVICE_URL_GET_ENTERPRISES, filters.enterpriseName, filters.branchName, filters.ID, localStorage.token);

                        fetch(url)
                            .then(res => res.json())
                            .then(json => {
                                dispatch(searchSuccessEnterprise(json));
                                resolve();
                            });
                    } else {
                        console.log(JSON.parse(this.response).ErrorMsg);
                    }
                }
            };
            xhttp.open("POST", types.SERVICE_URL_AUTH_TOKEN, true);
            xhttp.setRequestHeader('Authorization', 'Basic ' + btoa(localStorage.username + ':' + localStorage.password));
            xhttp.send();
        });
    };
}

export function fetchBranches(name) {
    return dispatch => {
        dispatch(searchBeginBranch(name));
        dispatch(findAccount(name));
        var url = util.format(types.SERVICE_URL_GET_BRANCHES, name,  localStorage.token);

        fetch(url)
            .then(res => res.json())
            .then(json => {
                dispatch(searchSuccessBranch(json));
            });
    };
}

export function fetchAccounts(sys, store, branch) {
    return dispatch => {
        dispatch(searchBeginBranch(name));
        var url = util.format(types.SERVICE_URL_GET_ACCOUNTS, sys, store, branch, localStorage.token);

        fetch(url)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchServicesSuccess(json));
                dispatch(activateSidebar());
                dispatch(hideEnterpriseSearch());
            });
    };
}