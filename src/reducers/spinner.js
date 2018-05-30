import * as types from '../actions/constants';
const initialState = { visible: false }

export default function (state = initialState, action) {
    switch (action.type) {
        case types.HIDE_SPINNER:
            return { ...state, visible: false };
        case types.SHOW_SPINNER:
            return { ...state, visible: false };
        case types.SHOW_LOGIN:
            return initialState;
        default:
            return state;
    }
}