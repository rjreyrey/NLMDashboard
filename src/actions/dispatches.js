const log = require('electron-log');
import * as types from '../actions/constants'
import { setFullName, hideLoginLoader, showLoginError, hideLogin, showEnterpriseSearch, hideEnterpriseSearch, searchSuccessBranch, associatedBranches, searchBeginBranch, findAccount, fetchServicesSuccess, activateSidebar } from '../actions';
var util = require('util')

export function verifyUser(username, password) {
    return dispatch => {
        var params = util.format('CSSUserId=%s&Password=%s', username, password);
        var xhttp = new XMLHttpRequest();
        localStorage.username = username;
        localStorage.password = password;

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    var response = xhttp.responseXML.getElementsByTagName('string')[0].childNodes[0].nodeValue;

                    if (response === 'Success') {
                        dispatch(fetchUserInformation(username));
                        dispatch(fetchToken());
                    } else {
                        dispatch(hideLoginLoader());
                        dispatch(showLoginError(response));
                    }
                } else {
                    dispatch(hideLoginLoader());
                    log.error(JSON.parse(this.response).ErrorMsg);
                }
            }
        };

        xhttp.open("POST", 'https://cssws.reyrey.com/ActiveDirectorySecurity.asmx/CSSAuthenticateUseridWithMessage', true, 'Cssclient', '1uw@hwyey');
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(params);
    };
}

function fetchUserInformation(username) {
    return dispatch => {
        var params = util.format('strEmailUserID=%s', username);
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    var response = xhttp.responseXML.getElementsByTagName('Name')[0].childNodes[0].nodeValue;
                    var firstName = response.split(', ')[1].replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });;
                    dispatch(setFullName(firstName));
                } else {
                    dispatch(setFullName(username));
                }
            }
        };

        xhttp.open("POST", 'https://cssws.reyrey.com/EMployeeInfoWebService.asmx/SelectEmployeeByEmailUserID', true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(params);
    };
}

function fetchToken() {
    return dispatch => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    var token = this.getResponseHeader('token');
                    localStorage.setItem('token', token);
                    dispatch(hideLoginLoader());
                    dispatch(hideLogin());
                    dispatch(showEnterpriseSearch());
                } else {
                    log.error(JSON.parse(this.response).ErrorMsg);
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

function fetchAssociatedBranches(name, ppsysid) {
    return dispatch => {
        var url = util.format(types.SERVICE_URL_GET_ASSOCIATED_BRANCHES, name, ppsysid, localStorage.token);

        fetch(url)
            .then(res => res.json())
            .then(json => {
                dispatch(associatedBranches(json));
            });
    };
}

export function fetchAccounts(name, sys, store, branch, enterpriseName) {
    return dispatch => {
        dispatch(searchBeginBranch(name));
        dispatch(findAccount(name, enterpriseName, sys, store, branch));
        var url = util.format(types.SERVICE_URL_GET_ACCOUNTS, encodeURIComponent(sys), store, branch, localStorage.token);

        fetch(url)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchAssociatedBranches(enterpriseName, encodeURIComponent(sys)));
                dispatch(fetchServicesSuccess(json));
                dispatch(activateSidebar());
                dispatch(hideEnterpriseSearch());
            });
    };
}