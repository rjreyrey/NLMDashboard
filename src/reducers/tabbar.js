import * as types from '../actions/constants';
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case types.ADD_TAB:
            var hasTab = false;
            state = state.map(tab => {
                if (tab.id === action.payload.id) {
                    tab.active = true;
                    hasTab = true;
                } else {
                    tab.active = false;
                }

                return tab;
            })

            if (!hasTab) {
                state.push({ id: action.payload.id, title: action.payload.name, type: action.payload.type, partition: action.payload.partition, active: true, autoChosen: false });
            }

            return state;
        case types.UPDATE_TAB:
            return state.map(tab => {
                if (tab.id == action.payload.id) {
                    tab.title = action.payload.title;
                }

                return tab;
            });
        case types.CLOSE_TAB:
            var currentTab = state.find((tab) => tab.id == action.payload.id);
            state = state.filter((view) => { return view.id != action.payload.id });

            if (state.length > 0) {
                if (currentTab.active == true) {
                    state[0].active = true;
                    state[0].autoChosen = true;
                } else {
                    state[0].autoChosen = false;
                }
            } 

            return [...state];
        case types.CLICK_TAB:
            return state.map(tab => {
                if (tab.id === action.payload.id) {
                    tab.active = true;
                    tab.autoChosen = false;
                } else {
                    tab.active = false;
                    tab.autoChosen = false;
                }

                return tab;
            })
        case types.NEW_WINDOW_TAB:
            state = state.map(tab => {
                tab.active = false;
                return tab;
            });

            var i = state.length;
            state.push({ id: action.payload.account.id + "_" + i, title: action.payload.account.name, partition: action.payload.account.partition, active: true });
            return state;
        case types.SHOW_LOGIN:
            return initialState;
        default:
            return state;
    }
}