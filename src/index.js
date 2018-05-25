import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { showLogin } from './actions'

const remote = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;
window.$ = global.jQuery = require('../assets/js/jquery.min.js');

/////////////////////auto updater/////////////////////////////////
var progressLoaded = false;



const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);


ipcRenderer.on('UpdateAvailable', function (event, text) {
    $('#AutoUpdater').find('h2').fadeOut(300, function (e) {
        $('#AutoUpdater').find('h2').text(text);
        $('#AutoUpdater').find('h2').fadeIn(300);
    });
});

ipcRenderer.on('NoUpdate', function (event, text) {
    store.dispatch(showLogin());

    $('#AutoUpdater').find('h2').fadeOut(700, function (e) {
        $('#AutoUpdater').addClass('hide');
        $('.innerContainer').css({ 'margin-top': '0px' });
    });
});

ipcRenderer.on('UpdateError', function (event, text) {
    $('#AutoUpdater').find('h2').fadeOut(300, function (e) {
        $('#AutoUpdater').find('h2').text(text);
        $('#AutoUpdater').find('h2').fadeIn(300);
    });
});

ipcRenderer.on('DownloadProgress', function (event, text) {
    if (!progressLoaded) {
        $('#AutoUpdater').find('h2').fadeOut(300, function (e) {
            $('#AutoUpdater').find('h2').text('Downloading');
            $('#AutoUpdater').find('h2').fadeIn(300);
            $('.progress-bar').css('width', parseInt(text) + '%');
            $('.progress').removeClass('hide');
        });
        progressLoaded = true;
    } else {
        $('.progress-bar').css('width', parseInt(text) + '%');
    }
});

ipcRenderer.on('UpdateDownloaded', function (event, text) {
    $('#AutoUpdater').fadeOut(300, function (e) {
        ipcRenderer.send('quitAndInstall');
    });

});