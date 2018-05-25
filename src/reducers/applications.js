const request = require("request");
import * as types from '../actions/constants';
var util = require('util')
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case types.APP_CLICK:
            return state.map(app => {
                app.services.map(service => { 

                    if (service.externals && service.externals.length > 0) {
                        service.externals.map(external => {
                            if (external.id == action.payload.id) {
                                external.active = true;
                                external.opened = true;
                            } else {
                                external.active = false;
                            }
                        });
                    } else {

                        if (service.id === action.payload.id) {

                            if (!service.active) {
                                service.active = true;
                                service.opened = true;
                            }
                        } else {
                            service.active = false;
                        }
                    }

                    return service;
                });

                return app;
            });
        case types.CLICK_TAB:
            return state.map(app => {
                app.services = app.services.map(service => {
                    if (service.externals && service.externals.length > 0) {
                        service.externals.map(external => {
                            if (external.partition == action.payload.partition) {
                                external.active = true;
                            } else {
                                external.active = false;
                            }
                        });
                    } else {
                        if (service.partition == action.payload.partition) {
                            service.active = true;
                        } else {
                            service.active = false;
                        }
                    }

                    return service;
                })

                return app;
            })
        case types.CLOSE_TAB:
            state = state.map(app => {
                app.services.forEach((service) => {
                    if (service.externals && service.externals.length > 0) {
                        service.externals.map(external => {
                            if (external.id == action.payload.id) {
                                external.active = false;
                                external.opened = false;
                            } 
                        });
                    } else {
                        if (service.id == action.payload.id) {
                            service.opened = false;
                            service.active = false;
                        }
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
            var externalServices = [];

            for (var i = 0; i < action.payload.AptusSites.length; i++) {
                var site = action.payload.AptusSites[i];
                var url = util.format(types.SERVICE_URL_APTUS, action.payload.BusinessGroupId, site.SiteId);
                var service = { id: types.ServiceTypes.Aptus + "_" + site.SiteId, type: types.ServiceTypes.Aptus, url: url, name: site.Name, active: false, opened: false, username: null, password: null, attemptedLogin: false, partition: guid(), loginStep: 0 }
                aptusServices.push(service);
            }

            var validMMSTypes = [1, 2, 3, 6, 10];
            for (var i = 0; i < action.payload.MarketingAccounts.length; i++) {
                var account = action.payload.MarketingAccounts[i];
                var url = util.format(types.SERVICE_URL_MARKETING, action.payload.BusinessGroupId, account.AccountId);
                var service = { id: types.ServiceTypes.Marketing + "_" + account.AccountId, type: types.ServiceTypes.Marketing, url: url, name: account.Name, active: false, opened: false, username: null, password: null, attemptedLogin: false, partition: guid(), loginStep: 0 };

                marketingServices.push(service);

                if (account.LegacyDealerId > 0 && validMMSTypes.includes(account.AccountType)) {
                    var mmsUrl = util.format(types.SERVICE_URL_MMS, account.LegacyDealerId);
                    var legacyService = { id: types.ServiceTypes.MMS + "_" + account.AccountId, type: types.ServiceTypes.MMS, url: mmsUrl, name: account.Name, active: false, opened: false, username: null, password: null, attemptedLogin: false, partition: guid(), loginStep: 0 };
                    mmsServices.push(legacyService);
                } 
            }

            for (var i = 0; i < action.payload.ServiceAccounts.length; i++) {
                var account = action.payload.ServiceAccounts[i];
                var externals = [];

                for (var j = 0; j < account.ExternalAccounts.length; j++) {
                    var external = account.ExternalAccounts[j];
                    var data = { id: 'external_' + i + '_' + j + '_' + external.Type, type: external.TypeId, typeName: external.Type, url: '#', name: external.Name + '-' + external.Type, active: false, opened: false, username: external.Username, password: external.Password, attemptedLogin: false, partition: guid(), loginStep: 0 };
                    externals.push(data)
                }

                var data = { id: 'external_' + i + '_' + account.Type, type: account.TypeId, name: account.Name, externals: externals };

                externalServices.push(data);
            }

            var externals = [];
            if (action.payload.GlobalExternalAccounts) {
                for (var i = 0; i < action.payload.GlobalExternalAccounts.length; i++) {
                    var account = action.payload.GlobalExternalAccounts[i];

                    externals.push({ id: 'global_' + i + "_" + account.Type, type: account.TypeId, name: account.Name, url: types.GetExternalServiceURL(account.TypeId), active: false, opened: false, username: account.Username, password: types.DecryptPassword(account.Password), attemptedLogin: false, partition: guid(), loginStep: 0 });
                }
            }

            externalServices.push({ id: 'external_globals', type: 'GLOBAL', name: 'Global Accounts', externals: externals });

            applications.push({
                name: "Web",
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

            applications.push({
                name: "Services",
                services: externalServices,
                id: 50
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