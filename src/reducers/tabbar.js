﻿import * as types from '../actions/constants';
window.$ = global.jQuery = require('../../assets/js/jquery.min.js');
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case types.ADD_TAB:
            var hasTab = false;
            state = state.map(tab => {
                if (tab.id === action.payload.id) {
                    tab.active = true;
                    hasTab = true;
                } else {
                    tab.active = false;
                }

                return tab;
            })

            if (!hasTab) {
                state.push({ id: action.payload.id, title: action.payload.name, partition: action.payload.partition, active: true });
            }

            return state;
        case types.UPDATE_TAB:
            return state.map(tab => {
                if (tab.id == action.payload.id) {
                    tab.title = action.payload.title;
                }

                return tab;
            });
        case types.CLOSE_TAB:
            var currentTab = state.find((tab) => tab.id == action.payload.id);
            state = state.filter((view) => { return view.id != action.payload.id });

            if (state.length > 0 && currentTab.active == true) {
                state[0].active = true;
            }

            return [...state];
        case types.CLICK_TAB:
            return state.map(tab => {
                if (tab.id === action.payload.id) {
                    tab.active = true;
                } else {
                    tab.active = false;
                }

                return tab;
            })
        case types.NEW_WINDOW_TAB:
            state = state.map(tab => {
                tab.active = false;
                return tab;
            });

            var i = state.length;
            state.push({ id: action.payload.account.id + "_" + i, title: action.payload.account.name, partition: action.payload.account.partition, active: true });
            return state;
        default:
            return state;
    }
}