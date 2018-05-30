import * as types from '../actions/constants';
const initialState = { id: 0 }

export default function (state = initialState, action) {
    switch (action.type) {
        case types.ACCOUNT_FIND:
            return { id:1, name: action.payload.account, enterprise: action.payload.enterprise, type: 'BU', loading: true };
        case types.FETCH_SERVICES_BEGIN:
            return { ...state, loading: true };
        case types.ACTIVATE_SIDEBAR:
            return { ...state, active: true };
        case types.SHOW_LOGIN:
            return initialState;
        default:
            return state;
    }
}