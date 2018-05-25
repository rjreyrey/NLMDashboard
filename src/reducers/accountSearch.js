const request = require("request");
import * as types from '../actions/constants';
var util = require('util')

const initialState = { buSearchData: [], accountSearchData: [], searching: false, visible: false, hasBUData: false, hasAccounts: false, currentSearchItem: 'Search Business Units', firstSearch: true };

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SEARCH_BEGIN_BRANCH:
            return { ...state, enterpriseSearchData: [], buSearchData: [], accountSearchData: [], searching: true, hasEnterpriseData: false, hasBUData: false, hasAccounts: false, currentSearchItem: 'Search Business Units' };
        case types.SEARCH_SUCCESS_BRANCH:
            return { ...state, buSearchData: action.payload.BusinessUnitResultList, searching: false, hasBUData: true };
        case types.SEARCH_SHOW:
            return { ...state, buSearchData: [], accountSearchData: [], searching: false, hasBUData: false, hasAccounts: false, currentSearchItem: 'Search Business Units', visible: true };
        case types.SEARCH_HIDE:
            return { ...state, visible: false, firstSearch: false };
        default:
            return state;
    }

}