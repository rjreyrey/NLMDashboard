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

export const ServiceTypes = {
    Aptus: 1,
    Marketing: 2,
    MMS: 3,
    SRM: 4,
    GoogleAnalytics: 5,
    Chatmeter: 6
}

///////////////////////////////////////////////////////SB01//////////////////////////////////////////////////////
export const SERVICE_URL_APTUS = 'https://web-sb01.reyqa.com/WebAnalytics/Index/%s?currentAccountId=%s'
export const SERVICE_URL_MMS = 'https://mms.aimdatabase.com/Tools/AdvancedSearch.aspx?searchTerm=%s&ReturnUrl=/AccountDetails.aspx'
export const SERVICE_URL_MARKETING = 'https://marketing-sb01.reyqa.com/ExternalReports/Search/%s?currentAccountId=%s'
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////QA01//////////////////////////////////////////////////////
//export const SERVICE_URL_APTUS = 'https://web-qa01.reyqa.com/WebAnalytics/Index/%s?currentAccountId=%s'
//export const SERVICE_URL_MMS = 'https://mms.aimdatabase.com/Tools/AdvancedSearch.aspx?searchTerm=%s&ReturnUrl=/AccountDetails.aspx'
//export const SERVICE_URL_MARKETING = 'https://marketing-qa01.reyqa.com/ExternalReports/Search/%s?currentAccountId=%s'
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////PRODUCTION///////////////////////////////////////////////////
//export const SERVICE_URL_APTUS = 'https://web.dealer.nakedlime.com/WebAnalytics/Index/100917?currentAccountId='
//export const SERVICE_URL_MMS = 'https://mms.aimdatabase.com/Tools/AdvancedSearch.aspx?searchTerm=%s&ReturnUrl=/AccountDetails.aspx'
//export const SERVICE_URL_MARKETING = 'https://marketing.dealer.nakedlime.com/ExternalReports/Search/'
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
