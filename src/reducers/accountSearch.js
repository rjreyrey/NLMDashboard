const request = require("request");
import * as types from '../actions/constants';

const initialState = { buSearchData: [], accountSearchData: [], searching: false, visible: false, hasBUData: false, hasAccounts: false, currentSearchItem: 'Search Business Units', firstSearch: true };

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SEARCH_BEGIN_BRANCH:
            return { ...state, enterpriseSearchData: [], buSearchData: [], accountSearchData: [], searching: true, hasEnterpriseData: false, hasBUData: false, hasAccounts: false, currentSearchItem: 'Search Business Units' };
        case types.SEARCH_SUCCESS_BRANCH:
            var result = [];

            if (action.payload.BusinessUnitResultList && action.payload.BusinessUnitResultList.length > 0) {
                result = action.payload.BusinessUnitResultList.sort(function (a, b) {
                    var nameA = a.Name.toLowerCase(), nameB = b.Name.toLowerCase();
                    if (nameA < nameB)
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    return 0;
                });
            }

            return { ...state, buSearchData: result, searching: false, hasBUData: true };
        case types.SEARCH_SHOW:
            return { ...state, buSearchData: [], accountSearchData: [], searching: false, hasBUData: false, hasAccounts: false, currentSearchItem: 'Search Business Units', visible: true };
        case types.SEARCH_HIDE:
            return { ...state, visible: false, firstSearch: false };
        case types.SHOW_LOGIN:
            return initialState;
        default:
            return state;
    }

}