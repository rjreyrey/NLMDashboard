import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { showLogin, updateAvailable, updateError, updateProgress } from './actions'

const remote = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);


ipcRenderer.on('UpdateAvailable', function (event, text) {
    store.dispatch(updateAvailable(text));
});

ipcRenderer.on('NoUpdate', function (event, text) {
    store.dispatch(showLogin());
});

ipcRenderer.on('UpdateError', function (event, text) {
    store.dispatch(updateError(text));
});

ipcRenderer.on('DownloadProgress', function (event, text) {
    store.dispatch(updateProgress(text));
});

ipcRenderer.on('UpdateDownloaded', function (event, text) {
    ipcRenderer.send('quitAndInstall');
});