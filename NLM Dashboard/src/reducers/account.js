import * as types from '../actions/constants';
window.$ = global.jQuery = require('../../assets/js/jquery.min.js');
const initialState = { id: 0 }
const foundAccount = { id: 105110, name: 'Jag Automotive', type: 'Busines Unit' };

export default function (state = initialState, action) {
    switch (action.type) {
        case types.ACCOUNT_FIND:
            console.log('finding account');
            return foundAccount;
        default:
            return state;
    }
}