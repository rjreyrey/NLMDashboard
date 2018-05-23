import * as types from '../actions/constants';
import { SHOW_SETTINGS, TOGGLE_BETA_CHANNEL, CHANGE_ENVRIONMENT, CLOSE_SETTINGS, RELAUNCH_APP } from '../actions/constants';
const ipcRenderer = require('electron').ipcRenderer; 
const settings = require('electron').remote.require('electron-settings');
const initialState = { visible: false, betaChannel: settings.get('userSettings.channel', 'latest') == 'latest' ? false : true, environment: settings.get('userSettings.environment', types.Environments.PRODUCTION), hasChanged: false, settingsVisible: true, alertVisible: false }

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_SETTINGS:
            return { ...state, visible: true, settingsVisible: true, alertVisible: false };
        case TOGGLE_BETA_CHANNEL:
            var channel = !state.betaChannel;

            if (channel) {
                settings.set('userSettings.channel', 'beta');
            } else {
                settings.set('userSettings.channel', 'latest');
                settings.delete('userSettings.environment');
            }

            return { ...state, betaChannel: channel, hasChanged: true };
        case CHANGE_ENVRIONMENT:
            settings.set('userSettings.environment', action.payload);

            return { ...state, environment: action.payload, hasChanged: true };
        case CLOSE_SETTINGS:
            if (state.hasChanged) {
                return { ...state, settingsVisible: false, alertVisible: true };
            } else {
                return { ...state, settingsVisible: true, alertVisible: false, visible: false };
            }
        case RELAUNCH_APP:
            ipcRenderer.send('relaunchApp');
            return state;
        default:
            return state;
    }
}