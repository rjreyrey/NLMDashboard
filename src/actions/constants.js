import { URLS } from './URLS';
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
export const ASSOCIATED_BRANCHES = 'ASSOCIATED_BRANCHES'
export const SHOW_SETTINGS = 'SHOW_SETTINGS'
export const TOGGLE_BETA_CHANNEL = 'TOGGLE_BETA_CHANNEL'
export const CHANGE_ENVRIONMENT = 'CHANGE_ENVRIONMENT'
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS'
export const RELAUNCH_APP = 'RELAUNCH_APP'
export const SHOW_LOGIN_LOADER = 'SHOW_LOGIN_LOADER'
export const HIDE_LOGIN_LOADER = 'HIDE_LOGIN_LOADER'
export const SHOW_LOGIN_ERROR = 'SHOW_LOGIN_ERROR'
export const SHOW_LOGIN = 'SHOW_LOGIN'
export const HIDE_LOGIN = 'HIDE_LOGIN'
export const SET_FULL_NAME = 'SET_FULL_NAME'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const CHANGE_USERNAME = 'CHANGE_USERNAME'
export const UPDATE_AVAILABLE = 'UPDATE_AVAILABLE'
export const UPDATE_ERROR = 'UPDATE_ERROR'
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS'

export const Environments = {
    PRODUCTION: 'PRODUCTION',
    QA: 'QA'
}

export const ServiceTypes = {
    Internal: 1,
    External: 2,
}

export const InternalServiceTypes = {
    Aptus: 1,
    Marketing: 2,
    MMS: 3,
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
    Flickr: 22,
    Cyfe: 23
}

export const SERVICE_URL_AUTH_TOKEN = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_AUTH_TOKEN
export const SERVICE_URL_GET_BRANCHES = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_GET_BRANCHES
export const SERVICE_URL_GET_ASSOCIATED_BRANCHES = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_GET_ASSOCIATED_BRANCHES
export const SERVICE_URL_GET_ACCOUNTS = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_GET_ACCOUNTS
export const SERVICE_URL_APTUS = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_APTUS
export const SERVICE_URL_MMS = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_MMS
export const SERVICE_URL_MARKETING = URLS[settings.get('userSettings.environment', Environments.PRODUCTION)].SERVICE_URL_MARKETING