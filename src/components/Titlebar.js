import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import WebviewControls from './WebviewControls';
import { showSettings, showLogin } from '../actions';

const electron = window.require("electron")
const remote = electron.remote;

class Titlebar extends Component {
    constructor(props) {
        super(props);
    }

    onLogOff() {
        this.props.showLogin();
    }

    onSettings() {
        this.props.showSettings();
    }

    onMaximize() {
        if (remote.getCurrentWindow().isMaximized()) {
            remote.getCurrentWindow().unmaximize();
        } else {
            remote.getCurrentWindow().maximize();
        }
    }

    onMinimize() {
        remote.getCurrentWindow().minimize();
    }

    onClose() {
        remote.getCurrentWindow().close();
    }

    openDevTools() {
        remote.getCurrentWindow().openDevTools();
    }

    render() {
        return <div id="titlebar" className="header">
            <div className="inner">
                <div className="headerTitle">
                    <img src="../assets/images/logo.png" alt="Logo" /><div id="nlmTitle" className="inline NLMGreen nlmTitle" onDoubleClick={this.openDevTools}>NLM</div>Dashboard
                </div>
                <WebviewControls />
                <div className="dragbar"></div>
                <div className={this.props.login.loggedIn && this.props.login.firstName.length > 0 ? "welcomeText" : "welcomeText hide"}>Welcome, {this.props.login.firstName}</div>
                <div className={this.props.login.loggedIn ? "logoff appControl" : "logoff appControl hide"} onClick={this.onLogOff.bind(this)}>Sign Off<i className="fas fa-sign-out-alt"></i></div>
                <div className="settingsApp appControl" onClick={this.onSettings.bind(this)}><i className="fas fa-cog"></i></div>
                <div className="minimizeApp appControl" onClick={this.onMinimize}><i className="far fa-window-minimize"></i></div>
                <div className="maximizeApp appControl" onClick={this.onMaximize}><i className="far fa-square"></i></div>
                <div className="closeApp appControl" onClick={this.onClose}><i className="fas fa-times"></i></div>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        showSettings: showSettings,
        showLogin: showLogin
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Titlebar);
