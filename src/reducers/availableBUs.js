import * as types from '../actions/constants';
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case types.ASSOCIATED_BRANCHES:
            var newState = action.payload.BusinessUnitResultList.sort(function (a, b) {
                var nameA = a.Name.toLowerCase(), nameB = b.Name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0; 
            });

            return newState;
        case types.SHOW_LOGIN:
            return initialState;
        default:
            return state;
    }
}