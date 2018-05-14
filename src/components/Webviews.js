import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { hideSpinner, showSpinner, hideControls, showControls, resetControls, disableControls, navigateBack, navigateForward, navigateReload, newWindowTab, updateTab } from '../actions/'
import * as types from '../actions/constants'

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
                    <div className={view.spinner ? 'drawing' : 'drawing hide'} id="spinner">
                        <div className="loading-dot"></div>
                    </div>
                    <webview key={id} id={id} data-id={view.id} className={view.active ? "webview" : "webview hide"} data-src={view.url} data-partition={view.partition} data-hasrun='false'></webview>
                </div>
            );
        });
    }

    componentDidUpdate() {
        let component = ReactDOM.findDOMNode(this);
        let views = component.querySelectorAll('webview');
        const filter = {
            urls: ["http://*/*", "https://*/*"]
        }

        for (var i = 0; i < views.length; i++) {
            if (views[i].dataset.hasrun == 'false') {
                var webview = views[i];
                views[i].partition = views[i].dataset.partition;
                views[i].allowpopups = false;

                views[i].addEventListener('did-start-loading', this.didStartLoading);
                views[i].addEventListener('did-stop-loading', this.didStopLoading);
                views[i].addEventListener('new-window', this.newWindow);
                views[i].dataset.hasrun = 'true';

                if (views[i].src == '') {
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
        var username = this.props.activeApplication.username != null ? this.props.activeApplication.username : localStorage.username;
        var password = this.props.activeApplication.password != null ? this.props.activeApplication.password : localStorage.password;

        //event.target.openDevTools();
        let session = event.target.getWebContents().session;

        if (this.isHWAP(pageUrl)) {
            contents.executeJavaScript("var form = $('#loginForm'); if (form.length > 0 && form.find('.error').length == 0) { form.find('[name=UserName]').val('" + username + "'); form.find('[name=Password]').val('" + password + "');form.submit(); }");
        } else if (this.isMMS(pageUrl)) {
            //session.cookies.set({ url: 'https://mms.aimdatabase.com', name: 'MMSDealershipSettings', value: '9999' }, function (error) { //currently this cookie is being deleted when navigating from the login page.  Waiting on a fix for this from MMS.
            contents.executeJavaScript("var form = jQuery('#form1'); if(form.length > 0) { form.find('input[id *= UserName]').val('" + username + "'); form.find('input[id *= Password]').val('" + password + "'); form.find('input[type=submit]').click();}");
            //});
        } else if (this.isSRM(pageUrl)) {
            contents.executeJavaScript("$('input[id *= UserName]').val('" + username + "'); $('input[id *= Password]').val('" + password + "'); $('input[type=submit]').click();");
        } else if (this.isChatmeter(pageUrl)) {
            contents.executeJavaScript("var form = jQuery('form[name *= login]'); if(form.length > 0) { var username = form.find('input[id *= Username]'); username.val('" + username + "'); username[0].dispatchEvent(new Event('input')); var password = form.find('input[id *= Password]'); password.val('" + password + "'); password[0].dispatchEvent(new Event('input')); form.find('input[type=submit]').click();}");
        } else if (this.isGoogleAnalytics(pageUrl, contents)) {

        }
    }

    isHWAP (pageUrl) {
        var valid = false;
        valid = ((this.props.activeApplication.type == types.ServiceTypes.Aptus || this.props.activeApplication.type == types.ServiceTypes.Marketing) && (pageUrl.pathname == '/' || pageUrl.pathname.indexOf('LogOn') >= 0));
        if (valid) {
            if (pageUrl.hostname.indexOf('web') >= 0) {
                valid = valid && !this.props.activeApplication.attemptedLogin;
                this.props.activeApplication.attemptedLogin = true;
            } else if (pageUrl.hostname.indexOf('marketing') >= 0) {
                valid = valid && !this.props.activeApplication.attemptedLogin;
                this.props.activeApplication.attemptedLogin = true;
            }
        }

        return valid;
    }

    isMMS(pageUrl) {
        var valid = (this.props.activeApplication.type == types.ServiceTypes.MMS); //&& pageUrl.pathname == '/'  <= removing for now because MMS will drop off query string parameters or build invalid URLs

        if (valid) {
            valid = valid && !this.props.activeApplication.attemptedLogin;
            this.props.activeApplication.attemptedLogin = true;
        }

        return valid;
    }

    isSRM(pageUrl) {
        var valid = (this.props.activeApplication.type == types.ServiceTypes.SRM && pageUrl.pathname.indexOf('Login.aspx') >= 0);

        if (valid) {
            valid = valid && !this.props.activeApplication.attemptedLogin;
            this.props.activeApplication.attemptedLogin = true;
        }

        return valid;
    }

    isGoogleAnalytics(pageUrl, contents) {
        var valid = (this.props.activeApplication.type == types.ServiceTypes.GoogleAnalytics);

        if (valid && !this.props.activeApplication.attemptedLogin) {
            if (pageUrl.pathname.indexOf('identifier') >= 0) {
                contents.executeJavaScript('var usernameInput = document.getElementById("identifierId"); if (usernameInput != undefined) {usernameInput.value="' + this.props.activeApplication.username + '"; document.getElementById("identifierNext").click();}');
            } else if (pageUrl.pathname.indexOf('pwd') >= 0) {
                var that = this;
                setTimeout(function () {
                    contents.executeJavaScript('var password = document.getElementsByName("password")[0]; if (password != undefined) {password.value = "' + that.props.activeApplication.password + '"; document.getElementById("passwordNext").click();} else {alert("password field was undefined")}');
                    this.props.activeApplication.attemptedLogin = true;
                }, 1000);
                
            }
        }

        return valid;
    }

    isChatmeter(pageUrl) {
        var valid = (this.props.activeApplication.type == types.ServiceTypes.Chatmeter && pageUrl.pathname == '/');

        if (valid) {
            valid = valid && !this.props.activeApplication.attemptedLogin;
            this.props.activeApplication.attemptedLogin = true;
        }

        return valid;
    }

    render() {
        return (
            <div id="webviews">
                {this.createListItems()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        applications: state.applications,
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
        updateTab: updateTab
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Webviews);