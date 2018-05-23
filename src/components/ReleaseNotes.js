import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { toggleBetaChannel, changeEnvironment, closeSettings, relaunchApp } from '../actions/'
import ApplicationList from './ApplicationList';
import availableBUs from '../reducers/availableBUs';
import ToggleButton from 'react-toggle-button';
import * as types from '../actions/constants';
const settings = require('electron').remote.require('electron-settings');

class ReleaseNotes extends Component {

    constructor(props) {
        super(props);
        this.state = { visible: false, notes: '', version: '' };
        var notes = settings.get('updateInfo.notes', '');

        if (notes.length > 0) {
            this.state = { visible: true, notes: notes, version: settings.get('updateInfo.version', '') };

            settings.set('updateInfo.notes', '');
            settings.set('updateInfo.version', '');

            //{"userSettings":{"channel":"beta","environment":"PRODUCTION"}, "updateInfo":{"notes":"beta stuff goes here", "version":"0.4.6-alpha"}}
        }
    }

    onOKClick() {
        this.setState({ ...this.state, visible: false });
    }

    render() {
        return (
            <div className={this.state.visible ? "fullWrapper" : "fullWrapper hide"}>
                <div className="releaseNotesWrapper">
                    <div className="title">Updated to version {this.state.version} </div>
                    <div className="notesTitle">:: Release Notes :: </div>
                    <div className="notes" dangerouslySetInnerHTML={{__html: this.state.notes}}></div>
                    <button onClick={this.onOKClick.bind(this)}>OK</button>
                </div>
            </div>
        )
    }
}

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

export default connect(mapStateToProps, matchDispatchToProps)(ReleaseNotes);
