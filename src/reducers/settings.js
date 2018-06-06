import * as types from '../actions/constants';
const ipcRenderer = require('electron').ipcRenderer; 
const settings = require('electron').remote.require('electron-settings');
const initialState = { visible: false, betaChannel: settings.get('userSettings.channel', 'latest') === 'latest' ? false : true, environment: settings.get('userSettings.environment', types.Environments.PRODUCTION), hasChanged: false, settingsVisible: true, alertVisible: false }

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SHOW_SETTINGS:
            return { ...state, visible: true, settingsVisible: true, alertVisible: false };
        case types.TOGGLE_BETA_CHANNEL:
            var channel = !state.betaChannel;

            if (channel) {
                settings.set('userSettings.channel', 'beta');
            } else {
                settings.set('userSettings.channel', 'latest');
                settings.delete('userSettings.environment');
            }

            return { ...state, betaChannel: channel, hasChanged: true };
        case types.CHANGE_ENVRIONMENT:
            settings.set('userSettings.environment', action.payload);

            return { ...state, environment: action.payload, hasChanged: true };
        case types.CLOSE_SETTINGS:
            if (state.hasChanged) {
                return { ...state, settingsVisible: false, alertVisible: true };
            } else {
                return { ...state, settingsVisible: true, alertVisible: false, visible: false };
            }
        case types.RELAUNCH_APP:
            ipcRenderer.send('relaunchApp');
            return state;
        case types.SHOW_LOGIN:
            return initialState;
        default:
            return state;
    }
}