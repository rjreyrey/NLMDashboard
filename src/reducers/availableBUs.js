import * as types from '../actions/constants';
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case types.ASSOCIATED_BRANCHES:
            var newState = action.payload.BusinessUnitResultList;

            return newState;
        case types.SHOW_LOGIN:
            return initialState;
        default:
            return state;
    }
}