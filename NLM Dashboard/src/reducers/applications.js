import * as types from '../actions/constants';

window.$ = global.jQuery = require('../../assets/js/jquery.min.js');

const initialState = []

const loggedInState = [
    { id: 1, name: 'Aptus', url: 'https://web.dealer.nakedlime.com/WebAnalytics/Index/100917?currentAccountId=100155', active: false, opened: false },
    { id: 2, name: 'MMS', url: 'https://mms.aimdatabase.com', active: false, opened: false },
    { id: 3, name: 'SRM', url: 'https://micrositesbyu.com/Login.aspx', active: false, opened: false },
    { id: 4, name: 'Google Analytics', url: 'https://analytics.google.com/', active: false, opened: false },
    { id: 5, name: 'Marketing', url: 'https://marketing.dealer.nakedlime.com', active: false, opened: false },
]

export default function (state = initialState, action) {
    switch (action.type) {
        case types.APP_CLICK:
            return state.map(app => {
                if (app.id === action.payload.id) {
                    var id = 'webview_' + app.id;
                    $('.webview').addClass('hide');

                    if (!app.active) {
                        if (!app.opened) {
                            document.getElementById(id).src = app.url;
                        }

                        app.active = true;
                        app.opened = true;
                        document.getElementById(id).classList.remove('hide');
                    } else {
                        document.getElementById(id).classList.remove('hide');
                    }
                } else {
                    app.active = false;
                }

                return app;
            });
        case types.ADD_APP:
            console.log('adding apps');
            return loggedInState;
        default:
            return state;
    }
    
}