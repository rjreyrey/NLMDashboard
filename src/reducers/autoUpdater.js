import * as types from '../actions/constants';
const initialState = { headerText: 'Checking for update...', percentComplete: 0 };

export default function (state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_AVAILABLE:
            return { ...state, headerText: 'Update Available' };
        case types.UPDATE_ERROR:
            return { ...state, headerText: 'Error with update - ' + action.payload };
        case types.UPDATE_PROGRESS:
            return { ...state, percentComplete: action.payload };
        default:
            return state;
    }
}