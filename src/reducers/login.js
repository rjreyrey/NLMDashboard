import * as types from '../actions/constants';
const { remote } = require('electron');
const initialState = { showLogin: false, loggedIn: false, showLoader: false, error: '', username: remote.getGlobal('credentials').username, password: '', usernameError: false, passwordError: false, firstName: '' }

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SHOW_LOGIN_LOADER:
            return { ...state, showLoader: true };
        case types.HIDE_LOGIN_LOADER:
            return { ...state, showLoader: false };
        case types.SHOW_LOGIN:
            return { ...initialState, showLogin: true };
        case types.HIDE_LOGIN:
            return { ...state, loggedIn: true, error: '' };
        case types.SHOW_LOGIN_ERROR:
            return { ...state, error: action.payload };
        case types.CHANGE_USERNAME:
            return { ...state, username: action.payload, usernameError: action.payload.length == 0 };
        case types.CHANGE_PASSWORD:
            return { ...state, password: action.payload, passwordError: action.payload.length == 0 };
        case types.SET_FULL_NAME:
            return { ...state, firstName: action.payload };
        default:
            return state;
    }
}