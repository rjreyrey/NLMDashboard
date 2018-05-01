const request = require("request");
import * as types from '../actions/constants';
var util = require('util')
window.$ = global.jQuery = require('../../assets/js/jquery.min.js');

const initialState = []

//const loggedInState = [
//    { id: 1, name: 'Aptus', url: 'https://web.dealer.nakedlime.com/WebAnalytics/Index/100917?currentAccountId=100155', active: false, opened: false, username: null, password: null },
//    { id: 2, name: 'MMS', url: 'https://mms.aimdatabase.com/Tools/AdvancedSearch.aspx?searchTerm=9999&ReturnUrl=/AccountDetails.aspx', active: false, opened: false, username: null, password: null },
//    { id: 3, name: 'SRM', url: 'https://micrositesbyu.com/Login.aspx', active: false, opened: false, username: 'ricky_jett@reyrey.com', password: 'Reynolds1!' },
//    { id: 4, name: 'Google Analytics', url: 'https://accounts.google.com/signin/v2/identifier?service=analytics&passive=1209600&continue=https%3A%2F%2Fanalytics.google.com%2Fanalytics%2Fweb%2F%23', active: false, opened: false, username: 'test', password: 'test' },
//    { id: 5, name: 'Marketing', url: 'https://marketing.dealer.nakedlime.com', active: false, opened: false, username: null, password: null },
//    { id: 6, name: 'Chatmeter', url: 'https://live.chatmeter.com', active: false, opened: false, username: 'NakedLimeDev', password: 'protectyours' },
//]

export default function (state = initialState, action) {
    switch (action.type) {
        case types.APP_CLICK:
            return state.map(app => {
                app.services.map(service => { 
                    if (service.id === action.payload.id) {

                        if (!service.active) {
                            service.active = true;
                            service.opened = true;
                        }
                    } else {
                        service.active = false;
                    }

                    return service;
                });

                return app;
            });
        case types.CLICK_TAB:
            return state.map(app => {
                app.services = app.services.map(service => {
                    if (service.id == action.payload.id) {
                        //var id = 'webview_' + service.id;
                        //$('.webview').addClass('hide');
                        service.active = true;
                        //document.getElementById(id).classList.remove('hide');
                    } else {
                        service.active = false;
                    }

                    return service;
                })

                return app;
            })
        case types.CLOSE_TAB:
            state = state.map(app => {
                app.services.forEach((service) => {
                    if (service.id == action.payload.id) {
                        service.opened = false;
                        service.active = false;
                    }
                });

                return app;
            });

            return state;
        case types.ADD_APP:
            return state;
        case types.FETCH_SERVICES_BEGIN:
            return state;
        case types.FETCH_SERVICES_SUCCESS:
            var applications = [];
            var aptusServices = [];
            var mmsServices = [];
            var marketingServices = [];
            
            for (var i = 0; i < action.payload.AptusSites.length; i++) {
                var site = action.payload.AptusSites[i];
                var url = util.format(types.SERVICE_URL_APTUS, action.payload.BusinessGroupId, site.SiteId);
                var service = { id: types.ServiceTypes.Aptus + "_" + site.SiteId, type: types.ServiceTypes.Aptus, url: url, name: site.Name, active: false, opened: false, username: null, password: null, attemptedLogin: false, partition: guid() }
                aptusServices.push(service);
            }

            for (var i = 0; i < action.payload.MarketingAccounts.length; i++) {
                var account = action.payload.MarketingAccounts[i];
                var url = util.format(types.SERVICE_URL_MARKETING, action.payload.BusinessGroupId, account.AccountId);
                var service = { id: types.ServiceTypes.Marketing + "_" + account.AccountId, type: types.ServiceTypes.Marketing, url: url, name: account.Name, active: false, opened: false, username: null, password: null, attemptedLogin: false, partition: guid() };

                marketingServices.push(service);

                if (account.LegacyDealerId > 0) {
                    var mmsUrl = util.format(types.SERVICE_URL_MMS, account.LegacyDealerId);
                    var legacyService = { id: types.ServiceTypes.MMS + "_" + account.AccountId, type: types.ServiceTypes.MMS, url: mmsUrl, name: account.Name, active: false, opened: false, username: null, password: null, attemptedLogin: false, partition: guid() };
                    mmsServices.push(legacyService);
                } 
            }

            applications.push({
                name: "Aptus",
                services: aptusServices,
                id: types.ServiceTypes.Aptus
            });
            
            applications.push({
                name: "Marketing",
                services: marketingServices,
                id: types.ServiceTypes.Marketing
            });

            applications.push({
                 name: "MMS",
                services: mmsServices,
                 id: types.ServiceTypes.MMS
             });


            return applications;
        default:
            return state;
    }
    
}


function guid() {
    var u = '', i = 0;
    while (i++ < 36) {
        var c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1], r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        u += (c == '-' || c == '4') ? c : v.toString(16)
    }
    return u;
}