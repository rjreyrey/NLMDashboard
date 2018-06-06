import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { toggleBetaChannel, changeEnvironment, closeSettings, relaunchApp } from '../actions/';
import VersionNumber from './VersionNumber';
import ToggleButton from 'react-toggle-button';
import * as types from '../actions/constants';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = { QABuilds: false };
    }

    onQAToggle() {
        this.props.toggleBetaChannel();
    }

    onEnvironmentSelect(event) {
        this.props.changeEnvironment(event.target.value);
    }

    onCloseClick() {
        this.props.closeSettings();
    }

    onRelaunchClick(event) {
        event.preventDefault();
        this.props.relaunchApp();
    }

    render() {
        return (
            <div className={this.props.settings.visible ? "fullWrapper" : "fullWrapper hide"}>
                <div className={this.props.settings.alertVisible ? "settingsAlertWrapper" : "settingsAlertWrapper hide"}>
                    Changes made require the dashboard to restart.  Pres OK to relaunch.
                    <button onClick={this.onRelaunchClick.bind(this)}>OK</button>
                </div>
                <div className={this.props.settings.settingsVisible ? "settingsWrapper" : "settingsWrapper hide"}>
                    <div className="settingsContainer">
                        <div className="title">Settings</div>
                        <div className="closeSettings" onClick={this.onCloseClick.bind(this)}><i className="fas fa-times"></i></div>

                        <div className="settingsItem">
                            <div className="label">Subscribe to QA Builds? </div>
                            <ToggleButton
                                inactiveLabel={'NO'}
                                activeLabel={'YES'}
                                colors={{
                                    activeThumb: {
                                        base: 'rgba(173,255,47,1)',
                                    },
                                    inactiveThumb: {
                                        base: 'rgb(128,128,128)',
                                    },
                                    active: {
                                        base: 'rgb(65,66,68)',
                                        hover: 'rgb(65,66,68)',
                                    },
                                    inactive: {
                                        base: 'rgb(65,66,68)',
                                        hover: 'rgb(65,66,68)',
                                    }
                                }}
                                trackStyle={{
                                    height: 20,
                                    boxShadow: `0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24)`,
                                    borderRadius: '2px'
                                }}
                                thumbStyle={{
                                    position: 'absolute',
                                    width: 30,
                                    height: 30,
                                    boxShadow: `0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24)`,
                                    borderRadius: '2px'
                                }}
                                thumbAnimateRange={[-10, 36]}
                                value={this.props.settings.betaChannel || false}
                                onToggle={this.onQAToggle.bind(this)} />
                        </div>
                        <div className={this.props.settings.betaChannel ? "settingsItem" : "settingsItem hide"}>
                            <div className="label">Which Environment? </div>
                            <select onChange={this.onEnvironmentSelect.bind(this)} value={this.props.settings.environment}>
                                <option value={types.Environments.PRODUCTION}>Production</option>
                                <option value={types.Environments.QA}>QA</option>
                            </select>
                        </div>
                    </div>

                    <VersionNumber />
                </div>
            </div>
        )
    }
}

Settings.displayName = 'Settings';

function mapStateToProps(state) {
    return {
        settings: state.settings
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleBetaChannel: toggleBetaChannel,
        changeEnvironment: changeEnvironment,
        closeSettings: closeSettings,
        relaunchApp: relaunchApp
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Settings);
