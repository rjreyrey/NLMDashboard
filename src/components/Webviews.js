import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { hideSpinner, showSpinner, showControls, resetControls, disableControls, newWindowTab, updateTab } from '../actions/';
import * as types from '../actions/constants';
import Spinner from './Spinner';
import { ExternalServiceTypes, InternalServiceTypes } from '../actions/constants';
import { AttemptLogin } from '../actions/login';
const electron = window.require("electron") 
const ipcRenderer = electron.ipcRenderer
const remote = require('electron').remote;

class Webviews extends Component {

    constructor(props) {
        super(props);

        this.didStartLoading = this.didStartLoading.bind(this);
        this.didStopLoading = this.didStopLoading.bind(this);
        this.newWindow = this.newWindow.bind(this);
        this.hasRun = false;
    }

    createListItems() {
        return this.props.webviews.map((view) => {
            var id = 'webview_' + view.id;
            return (
                <div className={view.active ? "webviewWrapper" : "webviewWrapper hide"} key={id}>
                    <Spinner show={view.spinner} />
                    <webview key={id} id={id} data-id={view.id} className={view.active ? "webview" : "webview hide"} data-src={view.url} data-partition={view.partition} data-hasrun='false' {...view.type === ExternalServiceTypes.Cyfe && { preload: '../assets/js/cyfeFix.js' }}></webview>
                </div>
            );
        });
    }

    componentDidUpdate() {
        let component = ReactDOM.findDOMNode(this);
        let views = component.querySelectorAll('webview');

        for (var i = 0; i < views.length; i++) {
            if (views[i].dataset.hasrun === 'false') {
                var webview = views[i];
                views[i].partition = views[i].dataset.partition;
                views[i].allowpopups = false;

                views[i].addEventListener('did-start-loading', this.didStartLoading);
                views[i].addEventListener('did-stop-loading', this.didStopLoading);
                views[i].addEventListener('new-window', this.newWindow);
                views[i].dataset.hasrun = 'true';

                if (views[i].src === '') {
                    views[i].src = views[i].dataset.src;
                }
            }
        }
    }

    newWindow(event) {
        event.preventDefault();
        this.props.newWindowTab(this.props.activeApplication, event.url);
    }

    didStartLoading(event) {
        event.target.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36");
        this.props.showSpinner(event.target.dataset.id);
        this.props.disableControls(event.target);

    }

    didStopLoading(event) {
        this.props.hideSpinner(event.target.dataset.id);
        this.props.resetControls(event.target);
        this.props.showControls(event.target);
        var contents = event.target;
        this.props.updateTab(contents.getTitle(), event.target.dataset.id);
        var pageUrl = new URL(contents.getURL());
        var username = this.props.activeApplication.username !== null ? this.props.activeApplication.username : localStorage.username;
        var password = this.props.activeApplication.password !== null ? this.props.activeApplication.password : localStorage.password;

        //event.target.openDevTools();

        if (!this.props.activeApplication.attemptedLogin) {
            this.props.activeApplication.attemptedLogin = AttemptLogin(pageUrl, this.props.activeApplication, contents, username, password);
        }
    }

    render() {
        return (
            <div id="webviews">
                {this.createListItems()}
            </div>
        );
    }
}

Webviews.displayName = 'Webviews';

function mapStateToProps(state) {
    return {
        activeApplication: state.activeApplication,
        webviews: state.webviews
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        hideSpinner: hideSpinner,
        showSpinner: showSpinner,
        showControls: showControls,
        resetControls: resetControls,
        disableControls: disableControls,
        newWindowTab: newWindowTab,
        updateTab: updateTab,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Webviews);