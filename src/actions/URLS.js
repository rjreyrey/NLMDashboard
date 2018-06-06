import { ExternalServiceTypes } from './constants';

export const URLS = {
    QA: {
        SERVICE_URL_AUTH_TOKEN: 'http://receiver.ddwqa01.reyqa.com/AuthService/api/Authenticate/LogOn?Application=100',
        SERVICE_URL_GET_BRANCHES: 'http://nlmservice-qa01.reyqa.com/api/AccountSearch/GetBranches?branchName=%s&id=%s&token=%s',
        SERVICE_URL_GET_ASSOCIATED_BRANCHES: 'http://nlmservice-qa01.reyqa.com/api/AccountSearch/GetBranches?enterpriseName=%s&id=%s&token=%s',
        SERVICE_URL_GET_ACCOUNTS: 'http://nlmservice-qa01.reyqa.com/api/AccountSearch/GetAccounts?System=%s&StoreNo=%s&BranchNo=%s&token=%s',
        SERVICE_URL_APTUS: 'https://web-qa01.reyqa.com/WebAnalytics/Index/%s?currentAccountId=%s',
        SERVICE_URL_MMS: 'https://mms.aimdatabase.com/Tools/AdvancedSearch.aspx?searchTerm=%s&ReturnUrl=/AccountDetails.aspx',
        SERVICE_URL_MARKETING: 'https://marketing-qa01.reyqa.com/ExternalReports/Search/%s?currentAccountId=%s'
    },

    PRODUCTION: {
        SERVICE_URL_AUTH_TOKEN: 'https://leads.cm.reyrey.com/AuthService/api/Authenticate/LogOn?Application=1',
        SERVICE_URL_GET_BRANCHES: 'https://nlmservice.dealer.nakedlime.com/api/AccountSearch/GetBranches?branchName=%s&id=%s&token=%s',
        SERVICE_URL_GET_ASSOCIATED_BRANCHES: 'https://nlmservice.dealer.nakedlime.com/api/AccountSearch/GetBranches?enterpriseName=%s&id=%s&token=%s',
        SERVICE_URL_GET_ACCOUNTS: 'https://nlmservice.dealer.nakedlime.com/api/AccountSearch/GetAccounts?System=%s&StoreNo=%s&BranchNo=%s&token=%s',
        SERVICE_URL_APTUS: 'https://web.dealer.nakedlime.com/WebAnalytics/Index/%s?currentAccountId=%s',
        SERVICE_URL_MMS: 'https://mms.aimdatabase.com/Tools/AdvancedSearch.aspx?searchTerm=%s&ReturnUrl=/AccountDetails.aspx',
        SERVICE_URL_MARKETING: 'https://marketing.dealer.nakedlime.com/ExternalReports/Search/%s?currentAccountId=%s'
    }
}


export function GetExternalServiceURL(type) {
    switch (type) {
        case ExternalServiceTypes.Google:
            return 'https://accounts.google.com/ServiceLogin';
        case ExternalServiceTypes.Facebook:
            return 'https://www.facebook.com/';
        case ExternalServiceTypes.Twitter:
            return 'https://twitter.com/';
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
        case ExternalServiceTypes.Cyfe:
            return 'https://app.cyfe.com';
        default:
            return '';
    }
}