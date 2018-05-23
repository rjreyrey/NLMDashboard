var base64js = require('base64-js');
var CryptoJS = require('crypto-js');
const settings = require('electron').remote.require('electron-settings');

export const ADD_APP = 'ADD_APP'
export const APP_CLICK = 'APP_CLICK'
export const ACCOUNT_FIND = 'ACCOUNT_FIND'
export const ACTIVATE_SIDEBAR = 'ACTIVATE_SIDEBAR'
export const APPLIST_REFRESH = 'APPLIST_REFRESH'
export const REFRESH_BROWSER_CONTROLS = 'REFRESH_BROWSER_CONTROLS'
export const NAVIGATE_BACK = 'NAVIGATE_BACK'
export const NAVIGATE_FORWARD = 'NAVIGATE_FORWARD'
export const NAVIGATE_RELOAD = 'NAVIGATE_RELOAD'
export const SHOW_SPINNER = 'SHOW_SPINNER'
export const HIDE_SPINNER = 'HIDE_SPINNER'
export const HIDE_CONTROLS = 'HIDE_CONTROLS'
export const SHOW_CONTROLS = 'SHOW_CONTROLS'
export const RESET_CONTROLS = 'RESET_CONTROLS'
export const DISABLE_CONTROLS = 'DISABLE_CONTROLS'
export const FETCH_SERVICES_BEGIN = 'FETCH_SERVICES_BEGIN'
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS'
export const ADD_TAB = 'ADD_TAB'
export const CLOSE_TAB = 'CLOSE_TAB'
export const CLICK_TAB = 'CLICK_TAB'
export const UPDATE_TAB = 'UPDATE_TAB'
export const NEW_WINDOW_TAB = 'NEW_WINDOW_TAB'
export const ADD_WEBVIEW = 'ADD_WEBVIEW'
export const DELETE_WEBVIEW = 'DELETE_WEBVIEW'
export const SET_NEW_ACTIVE_APP = 'SET_NEW_ACTIVE_APP'
export const INCREASE_LOGIN_STEP = 'INCREASE_LOGIN_STEP'
export const SEARCH_SHOW = 'SEARCH_SHOW'
export const SEARCH_HIDE = 'SEARCH_HIDE'
export const SEARCH_BEGIN_ENTERPRISE = 'SEARCH_BEGIN_ENTERPRISE'
export const SEARCH_SUCCESS_ENTERPRISE = 'SEARCH_SUCCESS_ENTERPRISE'
export const SEARCH_BEGIN_BRANCH = 'SEARCH_BEGIN_BRANCH'
export const SEARCH_SUCCESS_BRANCH = 'SEARCH_SUCCESS_BRANCH'
export const SHOW_SETTINGS = 'SHOW_SETTINGS'
export const TOGGLE_BETA_CHANNEL = 'TOGGLE_BETA_CHANNEL'
export const CHANGE_ENVRIONMENT = 'CHANGE_ENVRIONMENT'
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS'
export const RELAUNCH_APP = 'RELAUNCH_APP'

export const Environments = {
    PRODUCTION: 'PRODUCTION',
    QA: 'QA'
}

export const ServiceTypes = {
    Aptus: 1,
    Marketing: 2,
    MMS: 3,
    SRM: 4
}

export const ExternalServiceTypes = {
    Google: 1,
    Facebook: 2,
    Twitter: 3,
    Yelp: 4, 
    Bing: 5,
    DealerRater: 6,
    CarsDotCom: 7,
    Yahoo: 8,
    Instagram: 9,
    Chatmeter: 10,
    YouTube: 11,
    HootSuite: 12,
    Raven: 13,
    Polk: 14,
    GoogleAdwords: 15,
    GoogleAnalytics: 16,
    GooglePlus: 17,
    Kenshoo: 18,
    Acquisio: 19,
    LeadsBridge: 20,
    Shortstack: 21,
    Flickr: 22
}

const URLS = {
    QA: {
        SERVICE_URL_AUTH_TOKEN: 'http://receiver.ddwqa01.reyqa.com/AuthService/api/Authenticate/LogOn?Application=100',
        SERVICE_URL_GET_BRANCHES: 'http://nlmservice-qa01.reyqa.com/api/AccountSearch/GetBranches?branchName=%s&id=%s&token=%s',
        SERVICE_URL_GET_ACCOUNTS: 'http://nlmservice-qa01.reyqa.com/api/AccountSearch/GetAccounts?System=%s&StoreNo=%s&BranchNo=%s&token=%s',
        SERVICE_URL_APTUS: 'https://web-qa01.reyqa.com/WebAnalytics/Index/%s?currentAccountId=%s',
        SERVICE_URL_MMS: 'https://mms.aimdatabase.com/Tools/AdvancedSearch.aspx?searchTerm=%s&ReturnUrl=/AccountDetails.aspx',
        SERVICE_URL_MARKETING: 'https://marketing-qa01.reyqa.com/ExternalReports/Search/%s?currentAccountId=%s'
    },

    PRODUCTION: {
        SERVICE_URL_AUTH_TOKEN: 'https://leads.cm.reyrey.com/AuthService/api/Authenticate/LogOn?Application=1',
        SERVICE_URL_GET_BRANCHES: 'https://nlmservice.dealer.nakedlime.com/api/AccountSearch/GetBranches?branchName=%s&id=%s&token=%s',
        SERVICE_URL_GET_ACCOUNTS: 'https://nlmservice.dealer.nakedlime.com/api/AccountSearch/GetAccounts?System=%s&StoreNo=%s&BranchNo=%s&token=%s',
        SERVICE_URL_APTUS: 'https://web.dealer.nakedlime.com/WebAnalytics/Index/%s?currentAccountId=%s',
        SERVICE_URL_MMS: 'https://mms.aimdatabase.com/Tools/AdvancedSearch.aspx?searchTerm=%s&ReturnUrl=/AccountDetails.aspx',
        SERVICE_URL_MARKETING: 'https://marketing.dealer.nakedlime.com/ExternalReports/Search/%s?currentAccountId=%s'
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const SERVICE_URL_AUTH_TOKEN = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_AUTH_TOKEN
export const SERVICE_URL_GET_BRANCHES = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_GET_BRANCHES
export const SERVICE_URL_GET_ACCOUNTS = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_GET_ACCOUNTS
export const SERVICE_URL_APTUS = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_APTUS
export const SERVICE_URL_MMS = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_MMS
export const SERVICE_URL_MARKETING = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_MARKETING
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function GetExternalServiceURL(type) {
    switch (type) {
        case ExternalServiceTypes.Google:
            return 'https://accounts.google.com/ServiceLogin';
        case ExternalServiceTypes.Facebook:
            return 'https://www.facebook.com/';
        case ExternalServiceTypes.Twitter:
            return 'https://twitter.com/login';
        case ExternalServiceTypes.Yelp:
            return 'https://www.yelp.com/login';
        case ExternalServiceTypes.Bing:
            return 'https://login.live.com/login.srf';
        case ExternalServiceTypes.DealerRater:
            return 'https://www.dealerrater.com/login/';
        case ExternalServiceTypes.CarsDotCom:
            return 'https://www.cars.com/profile/secure/login/';
        case ExternalServiceTypes.Yahoo:
            return 'https://login.yahoo.com/config/login';
        case ExternalServiceTypes.Instagram:
            return 'https://www.instagram.com/accounts/login/';
        case ExternalServiceTypes.Chatmeter:
            return 'https://live.chatmeter.com';
        case ExternalServiceTypes.YouTube:
            return 'https://accounts.google.com/signin/v2/identifier?uilel=3&hl=en&passive=true&service=youtube&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Fhl%3Den%26next%3D%252F%26action_handle_signin%3Dtrue%26app%3Ddesktop&flowName=GlifWebSignIn&flowEntry=ServiceLogin';
        case ExternalServiceTypes.HootSuite:
            return 'https://hootsuite.com/login';
        case ExternalServiceTypes.Raven:
            return 'https://reporting.nakedlime.com/tools/m/login/';
        case ExternalServiceTypes.Polk:
            return '';
        case ExternalServiceTypes.GoogleAdwords:
            return 'https://adwords.google.com/um/signin';
        case ExternalServiceTypes.GoogleAnalytics:
            return 'https://analytics.google.com';
        case ExternalServiceTypes.GooglePlus:
            return 'https://accounts.google.com/ServiceLogin?passive=1209600&osid=1&continue=https://plus.google.com/discover&followup=https://plus.google.com/discover';
        case ExternalServiceTypes.Kenshoo:
            return 'https://social.kenshoo.com';
        case ExternalServiceTypes.Acquisio:
            return 'https://www.clientcampaigns.com/';
        case ExternalServiceTypes.LeadsBridge:
            return 'https://leadsbridge.com/app/login';
        case ExternalServiceTypes.Shortstack:
            return 'https://www.shortstackapp.com/';
        case ExternalServiceTypes.Flickr:
            return 'https://www.flickr.com/signin';
        default:
            return '';
    }
}

export function DecryptPassword(str) {
    var encryptionkey = 'cH8l3Fpp[s0ee<dqoi5GS0kKb9ZQxr6L3y5EJ4>vWain1tjE2';

    var buffer = base64js.toByteArray(str);
    var salt = buffer.slice(0, 8);
    var obj = getKeyAndIV(encryptionkey, salt);
    var clearText = CryptoJS.AES.decrypt(base64js.fromByteArray(buffer.slice(8)), obj.key, { iv: obj.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);

    clearText = clearText.replace(/(.)./g, "$1");
  
    return clearText;
}

function convertUint8ArrayToWordArray(u8Array) {
    var words = [], i = 0, len = u8Array.length;

    while (i < len) {
        words.push(
            (u8Array[i++] << 24) |
            (u8Array[i++] << 16) |
            (u8Array[i++] << 8) |
            (u8Array[i++])
        );
    }

    return {
        sigBytes: words.length * 4,
        words: words
    };
}

function convertWordArrayToUint8Array(wordArray) {
    var len = wordArray.words.length,
        u8_array = new Uint8Array(len << 2),
        offset = 0, word, i
        ;
    for (i = 0; i < len; i++) {
        word = wordArray.words[i];
        u8_array[offset++] = word >> 24;
        u8_array[offset++] = (word >> 16) & 0xff;
        u8_array[offset++] = (word >> 8) & 0xff;
        u8_array[offset++] = word & 0xff;
    }
    return u8_array;
}

function getKeyAndIV (password, salt) {

    var keyBitLength = 256;
    var ivBitLength = 128;
    var iterations = 1000;

    var iv128Bits = CryptoJS.PBKDF2(password, convertUint8ArrayToWordArray(salt), { keySize: 128 / 8, iterations: iterations });
    var key256Bits = CryptoJS.PBKDF2(password, convertUint8ArrayToWordArray(salt), { keySize: 256 / 8, iterations: iterations });

    return {
        iv: convertUint8ArrayToWordArray(convertWordArrayToUint8Array(iv128Bits).slice(0, 16)),
        key: convertUint8ArrayToWordArray(convertWordArrayToUint8Array(key256Bits).slice(16, 48)),
    };
};
