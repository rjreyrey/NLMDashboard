﻿import * as types from '../actions/constants';

export default function (state = null, action) {
    switch (action.type) {
        case types.APP_CLICK:
            console.log('app was clicked.  Setting it as the main');
            return { ...action.payload }
        default:
            return state;
    }
}