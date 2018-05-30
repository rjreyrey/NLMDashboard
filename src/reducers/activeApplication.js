import * as types from '../actions/constants';
const initialState = {};

export default function (state = null, action) {
    switch (action.type) {
        case types.APP_CLICK:
            return { ...action.payload }
        case types.SET_NEW_ACTIVE_APP:
            var activeService = {};

            action.payload.apps.map((app) => {
                app.services.map((service) => {
                    if (service.externals && service.externals.length > 0) {
                        service.externals.map(external => {
                            if (external.active == true) {
                                activeService = external;
                            }
                        });
                    } else {
                        if (service.active == true) {
                            activeService = service;
                        }
                    }
                });
            });
            return { ...activeService }
        case types.INCREASE_LOGIN_STEP:
            return { ...state, loginStep: ++state.loginStep };
        case types.SHOW_LOGIN:
            return initialState;
        default:
            return state;
    }
}