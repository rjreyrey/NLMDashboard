import * as types from '../actions/constants';
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SEARCH_SUCCESS_BRANCH:
            var newState = action.payload.BusinessUnitResultList;

            return newState;
        default:
            return state;
    }
}