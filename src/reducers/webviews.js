const request = require("request");
import * as types from '../actions/constants';
var util = require('util')
window.$ = global.jQuery = require('../../assets/js/jquery.min.js');

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case types.ADD_WEBVIEW:
            if (!state.find((view) => { return view.id == action.payload.tab.id })) {
                state.forEach((view) => { view.active = false });
                state.push({ id: action.payload.tab.id, url: action.payload.tab.url, active: true, partition: action.payload.tab.partition });
            }

            return [...state];
        case types.SHOW_SPINNER:
            return state.map((view) => {
                if (view.id == action.payload) {
                    view.spinner = true;
                } else {
                    view.spinner = false;
                }

                return view;
            });
        case types.HIDE_SPINNER:
            return state.map((view) => {
                if (view.id == action.payload) {
                    view.spinner = false;
                }

                return view;
            });
        case types.APP_CLICK:
            return state.map((view) => {
                if (view.id == action.payload.id) {
                    view.active = true;
                } else {
                    view.active = false;
                }

                return view;
            });
        case types.CLICK_TAB:
            return state.map((view) => {
                if (view.id == action.payload.id) {
                    view.active = true;
                } else {
                    view.active = false;
                }
                return view;
            });
        case types.CLOSE_TAB:
            var currentTab = state.find((view) => view.id == action.payload.id);
            state = state.filter((view) => { return view.id != action.payload.id });

            if (state.length > 0 && currentTab.active == true) {
                state[0].active = true;
            }

            return [...state];
        case types.NEW_WINDOW_TAB:
            state = state.map(view => {
                view.active = false;
                return view;
            });

            var i = state.length;
            state.push({ id: action.payload.account.id + "_" + i, url: action.payload.url, partition: action.payload.account.partition, active: true });
            return state;
        default:
            return state;
    }

}
