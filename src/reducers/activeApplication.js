import * as types from '../actions/constants';

export default function (state = null, action) {
    switch (action.type) {
        case types.APP_CLICK:
            return { ...action.payload }
        default:
            return state;
    }
}