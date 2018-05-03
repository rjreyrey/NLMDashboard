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
                        //var url = 'http://nlmservice-qa01.reyqa.com/api/AccountSearch/GetAccounts?'
                        //var queryString = 'system=CMSB01ERA010000&storeNo=02&branchNo=02&token=';
                        //var queryString = 'System=CMMT01ERA010000&StoreNo=01&BranchNo=01&token=';
                        var token = this.getResponseHeader('token');
                        localStorage.setItem('token', token);

                        var url = util.format('http://nlmservice-qa01.reyqa.com/api/AccountSearch/GetEnterprises?EnterpriseName=%s&branchName=%s&id=%s&token=%s', filters.enterpriseName, filters.branchName, filters.ID, localStorage.token);

                        fetch(url)
                            .then(res => res.json())
                            .then(json => {
                                dispatch(searchSuccessEnterprise(json));
                                //dispatch(activateSidebar());
                                resolve();
                            });

                        //fetch(url + queryString + token)
                        //    .then(res => res.json())
                        //    .then(json => {
                        //        dispatch(fetchServicesSuccess(json));
                        //        dispatch(activateSidebar());
                        //        resolve();
                        //    });
                    } else {
                        console.log(JSON.parse(this.response).ErrorMsg);
                    }
                }
            };
            xhttp.open("POST", 'http://receiver.ddwqa01.reyqa.com/AuthService/api/Authenticate/LogOn?Application=100', true);
            xhttp.setRequestHeader('Authorization', 'Basic ' + btoa(localStorage.username + ':' + localStorage.password));
            xhttp.send();
        });
    };
}

export function fetchBranches(name) {
    return dispatch => {
        dispatch(searchBeginBranch(name));
        dispatch(findAccount(name));
        var url = util.format('http://nlmservice-qa01.reyqa.com/api/AccountSearch/GetBranches?EnterpriseName=%s&token=%s', name,  localStorage.token);

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
        var url = util.format('http://nlmservice-qa01.reyqa.com/api/AccountSearch/GetAccounts?System=%s&StoreNo=%s&BranchNo=%s&token=%s', sys, store, branch, localStorage.token);

        fetch(url)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                dispatch(fetchServicesSuccess(json));
                dispatch(activateSidebar());
                dispatch(hideEnterpriseSearch());
            });
    };
}

export function fetchServices() {
    return dispatch => {
        dispatch(fetchServicesBegin());

        return new Promise(function (resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var url = 'http://nlmservice-qa01.reyqa.com/api/AccountSearch/GetAccounts?'
                        //var queryString = 'system=CMSB01ERA010000&storeNo=02&branchNo=02&token=';
                        var queryString = 'System=CMMT01ERA010000&StoreNo=01&BranchNo=01&token=';
                        var token = this.getResponseHeader('token');
                        localStorage.setItem('token', token);

                        fetch(url + queryString + token)
                            .then(res => res.json())
                            .then(json => {
                                dispatch(fetchServicesSuccess(json));
                                dispatch(activateSidebar());
                                resolve();
                            });
                    } else {
                        console.log(JSON.parse(this.response).ErrorMsg);
                    }
                }
            };
            xhttp.open("POST", 'http://receiver.ddwqa01.reyqa.com/AuthService/api/Authenticate/LogOn?Application=100', true);
            xhttp.setRequestHeader('Authorization', 'Basic ' + btoa(localStorage.username + ':' + localStorage.password));
            xhttp.send();
        });
    }

    //fetch('http://receiver-qa01.sandbox.reyrey.net/AuthService/api/Authenticate/LogOn?Application=100', {
    //    headers: {
    //        Authorization: 'Basic ' + btoa(username + ':' + password),
    //        'Access-Control-Request-Headers': 'authorization, content-type',
    //        'Access-Control-Request-Method': 'POST',
    //    },
    //    method: 'POST'
    //}).then((response) => {
    //})
}




var fakeDataCache = { "BusinessGroupId": 100000, "DMSBranchId": 100001, "MarketingAccounts": [{ "Name": "Casey SB01 St02 Br02", "AccountId": 100001, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br02", "AccountId": 100002, "AccountType": 3, "LegacyDealerId": 132 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100003, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100017, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100018, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100019, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100020, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100021, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100022, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100023, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100024, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100025, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100026, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "42 DH Test", "AccountId": 100029, "AccountType": 2, "LegacyDealerId": 797461 }, { "Name": "MMS Test Conversion Account", "AccountId": 100077, "AccountType": 2, "LegacyDealerId": 797813 }, { "Name": "Casey SB01 St02 Br02", "AccountId": 100079, "AccountType": 5, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br02", "AccountId": 100080, "AccountType": 5, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100094, "AccountType": 1, "LegacyDealerId": -1 }, { "Name": "MMS Test Conversion Account", "AccountId": 100103, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100104, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100106, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Adriel Barranquitas", "AccountId": 100110, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100112, "AccountType": 1, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100113, "AccountType": 1, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100122, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br01", "AccountId": 100139, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Downey Nissan", "AccountId": 100143, "AccountType": 2, "LegacyDealerId": 797697 }, { "Name": "Casey SB01 St02 Br02", "AccountId": 100152, "AccountType": 2, "LegacyDealerId": -1 }, { "Name": "Casey SB01 St02 Br02", "AccountId": 100185, "AccountType": 5, "LegacyDealerId": -1 }, { "Name": "MBU Data Feed Test - DDH", "AccountId": 100304, "AccountType": 9, "LegacyDealerId": 2414 }, { "Name": "Casey SB01 St02 Br02", "AccountId": 100329, "AccountType": 10, "LegacyDealerId": 798468 }, { "Name": "Casey SB01 St02 Br02", "AccountId": 100330, "AccountType": 10, "LegacyDealerId": 798479 }], "AptusSites": [{ "Name": "Casey SB01 St02 Br01", "SiteId": 100000, "SiteType": 1, "AnalyticsIds": [100006, 100007] }, { "Name": "David Test Site", "SiteId": 100011, "SiteType": 1, "AnalyticsIds": [100004] }, { "Name": "davew_Test1", "SiteId": 100013, "SiteType": 1, "AnalyticsIds": [100008] }, { "Name": "test hub - no BU", "SiteId": 100015, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "Stephen Test", "SiteId": 100017, "SiteType": 1, "AnalyticsIds": [100011] }, { "Name": "Josh Test", "SiteId": 100018, "SiteType": 1, "AnalyticsIds": [100012, 100012, 100012] }, { "Name": "ChristopherTest", "SiteId": 100020, "SiteType": 1, "AnalyticsIds": [100014] }, { "Name": "1 MB test", "SiteId": 100047, "SiteType": 1, "AnalyticsIds": [100037] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100048, "SiteType": 1, "AnalyticsIds": [100038] }, { "Name": "weatheda_test``'$%^'ô'testtest", "SiteId": 100049, "SiteType": 1, "AnalyticsIds": [100039] }, { "Name": "Andrew Craig Test2", "SiteId": 100056, "SiteType": 1, "AnalyticsIds": [100045] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100057, "SiteType": 1, "AnalyticsIds": [100113, 100114] }, { "Name": "Department Staff Test", "SiteId": 100059, "SiteType": 1, "AnalyticsIds": [100046] }, { "Name": "Ryan Test Site 2", "SiteId": 100062, "SiteType": 1, "AnalyticsIds": [100047] }, { "Name": "Josh Test 2", "SiteId": 100063, "SiteType": 1, "AnalyticsIds": [100195] }, { "Name": "MenuTest", "SiteId": 100064, "SiteType": 1, "AnalyticsIds": [100048] }, { "Name": "EmptySite", "SiteId": 100065, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100079, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "AndrewPortal", "SiteId": 100080, "SiteType": 2, "AnalyticsIds": [100050] }, { "Name": "980 Test", "SiteId": 100096, "SiteType": 1, "AnalyticsIds": [100053] }, { "Name": "Ricky Test 980", "SiteId": 100098, "SiteType": 1, "AnalyticsIds": [100055] }, { "Name": "Ryan BMW", "SiteId": 100099, "SiteType": 1, "AnalyticsIds": [100056] }, { "Name": "Ryan Test Site 3", "SiteId": 100100, "SiteType": 1, "AnalyticsIds": [100057, 100074] }, { "Name": "Ryan Service Portal Site", "SiteId": 100102, "SiteType": 2, "AnalyticsIds": [100062] }, { "Name": "WizardTestAB", "SiteId": 100103, "SiteType": 1, "AnalyticsIds": [100250] }, { "Name": "AndrewTest980", "SiteId": 100104, "SiteType": 1, "AnalyticsIds": [100063] }, { "Name": "Broken", "SiteId": 100105, "SiteType": 1, "AnalyticsIds": [100064] }, { "Name": "AndrewCraigBMWTest1", "SiteId": 100107, "SiteType": 1, "AnalyticsIds": [100065] }, { "Name": "Ryan Test Site 4", "SiteId": 100109, "SiteType": 1, "AnalyticsIds": [100067] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100110, "SiteType": 1, "AnalyticsIds": [100068] }, { "Name": "DeliveryErrorTest", "SiteId": 100111, "SiteType": 1, "AnalyticsIds": [100069] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100112, "SiteType": 1, "AnalyticsIds": [100070] }, { "Name": "Delivery Test Site 2", "SiteId": 100113, "SiteType": 1, "AnalyticsIds": [100071] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100114, "SiteType": 1, "AnalyticsIds": [100072] }, { "Name": "Ryan Test Site 5", "SiteId": 100115, "SiteType": 1, "AnalyticsIds": [100073] }, { "Name": "Casey SB01 St02 Br02", "SiteId": 100117, "SiteType": 1, "AnalyticsIds": [100076] }, { "Name": "Casey SB01 St02 Br02", "SiteId": 100118, "SiteType": 1, "AnalyticsIds": [100077] }, { "Name": "Jag Automotive", "SiteId": 100123, "SiteType": 1, "AnalyticsIds": [100082, 100338] }, { "Name": "The Rick Testing Site", "SiteId": 100127, "SiteType": 1, "AnalyticsIds": [100085] }, { "Name": "henriquez_test2", "SiteId": 100129, "SiteType": 1, "AnalyticsIds": [100087, 100087, 100088, 100090, 100091, 100092, 100093, 100094, 100095, 100097, 100098, 100099, 100100, 100101, 100102, 100103, 100104, 100105, 100106] }, { "Name": "Dean Myers SB01 St01 Br01", "SiteId": 100141, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "Andrew Craig Test3", "SiteId": 100142, "SiteType": 1, "AnalyticsIds": [100123] }, { "Name": "Can Delete", "SiteId": 100143, "SiteType": 1, "AnalyticsIds": [100124] }, { "Name": "Casey SB01 St02 Br02", "SiteId": 100145, "SiteType": 1, "AnalyticsIds": [100126] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100147, "SiteType": 1, "AnalyticsIds": [100128] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100148, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100149, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "BeckerTestingSiteWizard", "SiteId": 100150, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "Super Becker Test", "SiteId": 100152, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "Even Better Super Becker Test", "SiteId": 100153, "SiteType": 1, "AnalyticsIds": [100130] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100154, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100155, "SiteType": 1, "AnalyticsIds": [100131] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100156, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100158, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100159, "SiteType": 1, "AnalyticsIds": [100132] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100160, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "fairfield_add_test", "SiteId": 100161, "SiteType": 1, "AnalyticsIds": [100133] }, { "Name": "fairfield_add_test2", "SiteId": 100162, "SiteType": 1, "AnalyticsIds": [100134] }, { "Name": "Dev Test Site", "SiteId": 100163, "SiteType": 1, "AnalyticsIds": [100135] }, { "Name": "Can Delete", "SiteId": 100167, "SiteType": 2, "AnalyticsIds": [100139] }, { "Name": "Signature Toyota SB01 Test", "SiteId": 100168, "SiteType": 1, "AnalyticsIds": [100140] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100173, "SiteType": 1, "AnalyticsIds": [100145] }, { "Name": "BMW TEST Casey SB01 St02 Br01", "SiteId": 100175, "SiteType": 1, "AnalyticsIds": [100147] }, { "Name": "rules test", "SiteId": 100176, "SiteType": 1, "AnalyticsIds": [100148] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100177, "SiteType": 1, "AnalyticsIds": [100149] }, { "Name": "new rule test 2015", "SiteId": 100178, "SiteType": 1, "AnalyticsIds": [100150] }, { "Name": "Test Selected Rules Bug (Delete)", "SiteId": 100179, "SiteType": 1, "AnalyticsIds": [100151] }, { "Name": "DoNotUseWeathedaTest", "SiteId": 100180, "SiteType": 1, "AnalyticsIds": [100152] }, { "Name": "donotuseweatheda2", "SiteId": 100181, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "aaaaaaaaaaaaaaaaaaaaaaa", "SiteId": 100183, "SiteType": 1, "AnalyticsIds": [100154] }, { "Name": "Perf Test Motors", "SiteId": 100189, "SiteType": 1, "AnalyticsIds": [100161] }, { "Name": "WebDevTestCase", "SiteId": 100190, "SiteType": 1, "AnalyticsIds": [100162] }, { "Name": "SiteImportTest", "SiteId": 100191, "SiteType": 1, "AnalyticsIds": [100163] }, { "Name": "Ryan Test SP Site New", "SiteId": 100192, "SiteType": 2, "AnalyticsIds": [100164] }, { "Name": "email test", "SiteId": 100194, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "Chris Landing Page Site", "SiteId": 100197, "SiteType": 7, "AnalyticsIds": [100168] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100199, "SiteType": 2, "AnalyticsIds": [] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100200, "SiteType": 2, "AnalyticsIds": [] }, { "Name": "Myers Landing", "SiteId": 100201, "SiteType": 7, "AnalyticsIds": [100169] }, { "Name": "Goldfine Landing Page", "SiteId": 100202, "SiteType": 7, "AnalyticsIds": [100170] }, { "Name": "LandingPageTemplate", "SiteId": 100204, "SiteType": 7, "AnalyticsIds": [100171] }, { "Name": "Harrison Test", "SiteId": 100207, "SiteType": 1, "AnalyticsIds": [100174] }, { "Name": "dev sp test 8-19", "SiteId": 100209, "SiteType": 2, "AnalyticsIds": [100176] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100210, "SiteType": 2, "AnalyticsIds": [100177] }, { "Name": "Can Delete", "SiteId": 100219, "SiteType": 8, "AnalyticsIds": [100179] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100220, "SiteType": 8, "AnalyticsIds": [100180] }, { "Name": "Can Delete", "SiteId": 100221, "SiteType": 8, "AnalyticsIds": [100181] }, { "Name": "Goldfine Frame In Site", "SiteId": 100222, "SiteType": 8, "AnalyticsIds": [100182] }, { "Name": "Can Delete Test thing", "SiteId": 100224, "SiteType": 8, "AnalyticsIds": [100184] }, { "Name": "Can Delete", "SiteId": 100225, "SiteType": 8, "AnalyticsIds": [100185] }, { "Name": "Form Test Site", "SiteId": 100226, "SiteType": 1, "AnalyticsIds": [100186] }, { "Name": "FAIRFIJA_Deposit", "SiteId": 100228, "SiteType": 1, "AnalyticsIds": [100187] }, { "Name": "IncentivesTest", "SiteId": 100229, "SiteType": 1, "AnalyticsIds": [] }, { "Name": "IncentiveTest2", "SiteId": 100230, "SiteType": 1, "AnalyticsIds": [100188] }, { "Name": "Test Incentive Saving", "SiteId": 100231, "SiteType": 1, "AnalyticsIds": [100189] }, { "Name": "Broken Don't User", "SiteId": 100232, "SiteType": 1, "AnalyticsIds": [100190] }, { "Name": "Scale Site Creation Test", "SiteId": 100237, "SiteType": 1, "AnalyticsIds": [100196] }, { "Name": "Scale Site Creation Test", "SiteId": 100238, "SiteType": 1, "AnalyticsIds": [100197] }, { "Name": "New SP Test", "SiteId": 100239, "SiteType": 2, "AnalyticsIds": [100198] }, { "Name": "3.25 test SP", "SiteId": 100242, "SiteType": 2, "AnalyticsIds": [100201] }, { "Name": "Can Delete", "SiteId": 100243, "SiteType": 2, "AnalyticsIds": [100202] }, { "Name": "BMW 1268 Test", "SiteId": 100256, "SiteType": 1, "AnalyticsIds": [100215] }, { "Name": "Trent Service Portal Site", "SiteId": 100257, "SiteType": 2, "AnalyticsIds": [100216] }, { "Name": "IMN Microsite", "SiteId": 100259, "SiteType": 7, "AnalyticsIds": [100218] }, { "Name": "1400 test", "SiteId": 100261, "SiteType": 1, "AnalyticsIds": [100220] }, { "Name": "Paul Test", "SiteId": 100263, "SiteType": 1, "AnalyticsIds": [100222, 100261] }, { "Name": "Trent Test Hub Site", "SiteId": 100264, "SiteType": 1, "AnalyticsIds": [100223] }, { "Name": "Trent Test", "SiteId": 100265, "SiteType": 1, "AnalyticsIds": [100224, 100254] }, { "Name": "Myers Web Service Site", "SiteId": 100269, "SiteType": 3, "AnalyticsIds": [100227] }, { "Name": "Myers Micro Site", "SiteId": 100270, "SiteType": 4, "AnalyticsIds": [100228] }, { "Name": "joshuatest", "SiteId": 100275, "SiteType": 1, "AnalyticsIds": [100233, 100275] }, { "Name": "Ricky SP test", "SiteId": 100276, "SiteType": 2, "AnalyticsIds": [100234] }, { "Name": "Call Tracking Test 1 (SB1)", "SiteId": 100282, "SiteType": 1, "AnalyticsIds": [100240] }, { "Name": "Call Tracking Test 2 (SB1)", "SiteId": 100283, "SiteType": 1, "AnalyticsIds": [100241] }, { "Name": "Matthew Test", "SiteId": 100287, "SiteType": 1, "AnalyticsIds": [100245, 100257] }, { "Name": "ricky HUB test", "SiteId": 100288, "SiteType": 1, "AnalyticsIds": [100246] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100289, "SiteType": 1, "AnalyticsIds": [100247] }, { "Name": "Test add service portal site.", "SiteId": 100359, "SiteType": 2, "AnalyticsIds": [100258] }, { "Name": "HileTest", "SiteId": 100370, "SiteType": 1, "AnalyticsIds": [100260] }, { "Name": "Secure Test", "SiteId": 100410, "SiteType": 1, "AnalyticsIds": [100265] }, { "Name": "Paul Alt-Locale Test", "SiteId": 100411, "SiteType": 1, "AnalyticsIds": [100266] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100420, "SiteType": 1, "AnalyticsIds": [100268] }, { "Name": "Matthew Test 2", "SiteId": 100423, "SiteType": 1, "AnalyticsIds": [100273] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100426, "SiteType": 1, "AnalyticsIds": [100276] }, { "Name": "ToolbarTest", "SiteId": 100429, "SiteType": 1, "AnalyticsIds": [100278] }, { "Name": "ToolbarTest2", "SiteId": 100430, "SiteType": 1, "AnalyticsIds": [100279] }, { "Name": "ToolbarTest3", "SiteId": 100431, "SiteType": 1, "AnalyticsIds": [100280] }, { "Name": "testa a a abdf", "SiteId": 100438, "SiteType": 1, "AnalyticsIds": [100283] }, { "Name": "MySpecials Mobile Test", "SiteId": 100444, "SiteType": 1, "AnalyticsIds": [100284] }, { "Name": "Test Site", "SiteId": 100446, "SiteType": 1, "AnalyticsIds": [100286] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100447, "SiteType": 1, "AnalyticsIds": [100287] }, { "Name": "Toyota/Scion", "SiteId": 100448, "SiteType": 1, "AnalyticsIds": [100288] }, { "Name": "addingsiteTest", "SiteId": 100449, "SiteType": 1, "AnalyticsIds": [100289] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100450, "SiteType": 1, "AnalyticsIds": [100290] }, { "Name": "Test Vehicle Details Added", "SiteId": 100452, "SiteType": 1, "AnalyticsIds": [100291] }, { "Name": "AMA Test", "SiteId": 100454, "SiteType": 1, "AnalyticsIds": [100293] }, { "Name": "AMA Test", "SiteId": 100455, "SiteType": 1, "AnalyticsIds": [100294] }, { "Name": "siteaddedtest", "SiteId": 100456, "SiteType": 1, "AnalyticsIds": [100295] }, { "Name": "testingsite2", "SiteId": 100457, "SiteType": 1, "AnalyticsIds": [100296] }, { "Name": "AMA Test", "SiteId": 100458, "SiteType": 1, "AnalyticsIds": [100297] }, { "Name": "Should Have No MySpecials", "SiteId": 100459, "SiteType": 7, "AnalyticsIds": [100298] }, { "Name": "Hub Shouldn't Have MySpecials", "SiteId": 100460, "SiteType": 1, "AnalyticsIds": [100299] }, { "Name": "Micro should have no MySpecials", "SiteId": 100461, "SiteType": 4, "AnalyticsIds": [100300] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100462, "SiteType": 4, "AnalyticsIds": [100301] }, { "Name": "Matthew Landing Page Site", "SiteId": 100463, "SiteType": 7, "AnalyticsIds": [100302] }, { "Name": "Hile SP Test", "SiteId": 100468, "SiteType": 2, "AnalyticsIds": [100304] }, { "Name": "Matthew Sitemap 404 Test", "SiteId": 100469, "SiteType": 1, "AnalyticsIds": [100305] }, { "Name": "ricky test 10-04", "SiteId": 100470, "SiteType": 1, "AnalyticsIds": [100306] }, { "Name": "10-04 test", "SiteId": 100471, "SiteType": 1, "AnalyticsIds": [100307] }, { "Name": "Matthew Demo Test", "SiteId": 100475, "SiteType": 1, "AnalyticsIds": [100308] }, { "Name": "test demo site", "SiteId": 100476, "SiteType": 1, "AnalyticsIds": [100309] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100477, "SiteType": 1, "AnalyticsIds": [100310] }, { "Name": "SiteMap Hub Test", "SiteId": 100478, "SiteType": 1, "AnalyticsIds": [100311] }, { "Name": "es-us Test", "SiteId": 100479, "SiteType": 1, "AnalyticsIds": [100312] }, { "Name": "Default Pages Test", "SiteId": 100480, "SiteType": 1, "AnalyticsIds": [100313] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100483, "SiteType": 1, "AnalyticsIds": [100316] }, { "Name": "Trent Spanish Site", "SiteId": 100485, "SiteType": 1, "AnalyticsIds": [100318] }, { "Name": "Nothing Added Site", "SiteId": 100486, "SiteType": 1, "AnalyticsIds": [100319] }, { "Name": "spanish test", "SiteId": 100487, "SiteType": 1, "AnalyticsIds": [100320] }, { "Name": "spanish test 2", "SiteId": 100491, "SiteType": 1, "AnalyticsIds": [100321] }, { "Name": "spanish test 3", "SiteId": 100493, "SiteType": 1, "AnalyticsIds": [100322] }, { "Name": "Test Add Non-English", "SiteId": 100501, "SiteType": 1, "AnalyticsIds": [100324] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100518, "SiteType": 1, "AnalyticsIds": [100326] }, { "Name": "landing page test", "SiteId": 100534, "SiteType": 7, "AnalyticsIds": [100328] }, { "Name": "Painter's Mitsubishi Clone", "SiteId": 100539, "SiteType": 1, "AnalyticsIds": [100329] }, { "Name": "Spanish Test", "SiteId": 100546, "SiteType": 1, "AnalyticsIds": [100331] }, { "Name": "Spanish Test 2", "SiteId": 100547, "SiteType": 1, "AnalyticsIds": [100332] }, { "Name": "Paul Hub Test", "SiteId": 100580, "SiteType": 1, "AnalyticsIds": [100334] }, { "Name": "Hub Template Test", "SiteId": 100581, "SiteType": 1, "AnalyticsIds": [100335] }, { "Name": "Matthew Spanish Test", "SiteId": 100582, "SiteType": 1, "AnalyticsIds": [100336] }, { "Name": "Hile Micro Site", "SiteId": 100592, "SiteType": 4, "AnalyticsIds": [100337] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100650, "SiteType": 1, "AnalyticsIds": [100339] }, { "Name": "Hile Inventory Test", "SiteId": 100654, "SiteType": 1, "AnalyticsIds": [100340] }, { "Name": "Test Landing Page", "SiteId": 100665, "SiteType": 7, "AnalyticsIds": [100341] }, { "Name": "Casey SB01 St02 Br01", "SiteId": 100666, "SiteType": 7, "AnalyticsIds": [100342] }, { "Name": "Logical Delete Test", "SiteId": 100673, "SiteType": 1, "AnalyticsIds": [100343] }, { "Name": "Hile UK Test", "SiteId": 100699, "SiteType": 1, "AnalyticsIds": [100344] }] }