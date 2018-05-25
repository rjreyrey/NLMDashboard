import * as types from '../actions/constants';
const initialState = { visible: false, canGoBack: false, canGoForward: false, canRefresh: false }

export default function (state = initialState, action) {
    switch (action.type) {
        case types.HIDE_CONTROLS:
            return { ...state, visible: false };
        case types.SHOW_CONTROLS:
            return { ...state, visible: true };
        case types.RESET_CONTROLS:
            return { ...state, canGoBack: action.payload.canGoBack(), canGoForward: action.payload.canGoForward(), canRefresh: true, visible: true };
        case types.DISABLE_CONTROLS:
            return { ...state, canGoBack: false, canGoForward: false, canRefresh: false };
        case types.NAVIGATE_RELOAD:
            if (state.canRefresh) {
                document.querySelector('webview:not(.hide)').reload();
            }
            return state;
        case types.NAVIGATE_BACK:
            if (state.canGoBack) {
                document.querySelector('webview:not(.hide)').goBack();
            }
            return state;
        case types.NAVIGATE_FORWARD:
            if (state.canGoForward) {
                document.querySelector('webview:not(.hide)').goForward();
            }
            return state;
        default:
            return state;
    }
}