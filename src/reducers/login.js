import * as types from '../actions/constants';
const initialState = { loggedIn: false, showLoader: false, error: '' }

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SHOW_LOGIN_LOADER:
            return { ...state, showLoader: true };
        case types.HIDE_LOGIN_LOADER:
            return { ...state, showLoader: false };
        case types.SHOW_LOGIN:
            console.log('in the reducer');
            return initialState;
        case types.HIDE_LOGIN:
            return { ...state, loggedIn: true, error: '' };
        case types.SHOW_LOGIN_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}