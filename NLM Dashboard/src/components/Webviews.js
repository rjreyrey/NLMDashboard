﻿import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { hideSpinner, showSpinner, hideControls, showControls, resetControls, disableControls, navigateBack, navigateForward, navigateReload } from '../actions/'

const electron = window.require("electron") 
const ipcRenderer = electron.ipcRenderer
const remote = require('electron').remote;

const loginAttempts = {
    HWAP: {
        Aptus: false,
        Marketing: false,
        VMS: false
    },
    MMS: false,
    SRM: false,
    GoogleAnalytics: false
};

class Webviews extends Component {

    constructor(props) {
        super(props);

        this.didStartLoading = this.didStartLoading.bind(this);
        this.didStopLoading = this.didStopLoading.bind(this);
        this.newWindow = this.newWindow.bind(this);
    }

    createlistItems() {
        return this.props.applications.map((app) => {
            //<webview key={app.id} id={id} className="webview hide" webpreferences="nativeWindowOpen=true" allowpopups></webview>
            var id = 'webview_' + app.id;
            return (
                <webview key={app.id} id={id} className="webview hide"></webview>
            );
        });
    }

    componentDidUpdate() {
        let component = ReactDOM.findDOMNode(this);
        var views = component.querySelectorAll('webview');

        for (var i = 0; i < views.length; i++) {
            views[i].removeEventListener
            views[i].addEventListener('did-start-loading', this.didStartLoading);
            views[i].addEventListener('did-stop-loading', this.didStopLoading);
            views[i].addEventListener('new-window', this.newWindow);
        }
    }

    newWindow(event) {
        event.preventDefault();
        event.target.loadURL(event.url);
    }

    didStartLoading(event) {
        this.props.showSpinner();
        this.props.disableControls(event.target);
    }

    didStopLoading(event) {
        this.props.hideSpinner();
        this.props.resetControls(event.target);
        this.props.showControls(event.target);
        var contents = event.target;
        var pageUrl = new URL(contents.getURL());
        var username = remote.getGlobal('credentials').username;
        var password = remote.getGlobal('credentials').password;
        var SRMUsername = remote.getGlobal('credentials').SRMUsername;
        var SRMPassword = remote.getGlobal('credentials').SRMPassword;

        if (this.isHWAP(pageUrl)) {
            contents.executeJavaScript("var form = $('#loginForm'); if (form.length > 0 && form.find('.error').length == 0) { form.find('[name=UserName]').val('" + username + "'); form.find('[name=Password]').val('" + password + "');form.submit(); }");
        } else if (this.isMMS(pageUrl)) {
            contents.executeJavaScript("var form = jQuery('#form1'); if(form.length > 0) { form.find('input[id *= UserName]').val('" + username + "'); form.find('input[id *= Password]').val('" + password + "'); form.find('input[type=submit]').click();}");
        } else if (this.isSRM(pageUrl)) {
            contents.executeJavaScript("$('input[id *= UserName]').val('" + SRMUsername + "'); $('input[id *= Password]').val('" + SRMPassword + "'); $('input[type=submit]').click();");
        } else if (this.isGoogleAnalytics(pageUrl)) {

        }
    }

    isHWAP (pageUrl) {
        var valid = false;
        valid = (pageUrl.hostname.indexOf('dealer.nakedlime.com') >= 0 && (pageUrl.pathname == '/' || pageUrl.pathname.indexOf('LogOn') >= 0));

        if (valid) {
            if (pageUrl.hostname.indexOf('web') >= 0) {
                valid = valid && !loginAttempts.HWAP.Aptus;
                loginAttempts.HWAP.Aptus = true;
            } else if (pageUrl.hostname.indexOf('marketing') >= 0) {
                valid = valid && !loginAttempts.HWAP.Marketing;
                loginAttempts.HWAP.Marketing = true;
            }
        }

        return valid;
    }

    isMMS(pageUrl) {
        var valid = (pageUrl.hostname.indexOf('mms.aimdatabase.com') >= 0 && pageUrl.pathname == '/');

        if (valid) {
            valid = valid && !loginAttempts.MMS;
            loginAttempts.MMS = true;
        }

        return valid;
    }

    isSRM(pageUrl) {
        var valid = (pageUrl.hostname.indexOf('micrositesbyu.com') >= 0 && pageUrl.pathname.indexOf('Login.aspx') >= 0);

        if (valid) {
            valid = valid && !loginAttempts.SRM;
            loginAttempts.SRM = true;
        }

        return valid;
    }

    isGoogleAnalytics(pageUrl) {
        var valid = !loginAttempts.GoogleAnalytics;

        if (valid) {
            valid = valid && !loginAttempts.GoogleAnalytics;
            loginAttempts.GoogleAnalytics = true;
        }

        return valid;
    }

    render() {
        return (
            <div id="webviews">
                {this.createlistItems()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        applications: state.applications
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        hideSpinner: hideSpinner,
        showSpinner: showSpinner,
        showControls: showControls,
        resetControls: resetControls,
        disableControls: disableControls
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Webviews);