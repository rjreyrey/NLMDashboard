const request = require("request");
import * as types from '../actions/constants';
var util = require('util')

const initialState = { enterpriseSearchData: [], buSearchData: [], accountSearchData: [], searching: false, visible: false, hasEnterpriseData: false, hasBUData: false, hasAccounts: false, currentSearchItem: 'Search Enterprise' };

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SEARCH_BEGIN_ENTERPRISE:
            return { ...state, enterpriseSearchData: [], buSearchData: [], accountSearchData: [], searching: true };
        case types.SEARCH_SUCCESS_ENTERPRISE:
            return { ...state, enterpriseSearchData: action.payload.EnterpriseResultList, searching: false, hasEnterpriseData: true, currentSearchItem: 'Select Enterprise' };
        case types.SEARCH_BEGIN_BRANCH:
            return { ...state, searching: true, currentSearchItem: 'Select Busines Unit' };
        case types.SEARCH_SUCCESS_BRANCH:
            return { ...state, buSearchData: action.payload.BusinessUnitResultList, searching: false, hasBUData: true };
        case types.SEARCH_SHOW:
            return { ...initialState, visible: true };
        case types.SEARCH_HIDE:
            return { ...state, visible: false };
        default:
            return state;
    }

}