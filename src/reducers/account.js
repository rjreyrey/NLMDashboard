import * as types from '../actions/constants';
window.$ = global.jQuery = require('../../assets/js/jquery.min.js');
const initialState = { id: 0 }
//const foundAccount = { id: 105110, name: 'Development Test', type: 'BU', active: false, loading: false };

export default function (state = initialState, action) {
    switch (action.type) {
        case types.ACCOUNT_FIND:
            return { id:1, name: action.payload, type: 'BU', active: false, loading: false };
        case types.FETCH_SERVICES_BEGIN:
            return { ...state, loading: true };
        case types.ACTIVATE_SIDEBAR:
            return { ...state, active: true };
        default:
            return state;
    }
}