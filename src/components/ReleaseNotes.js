import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
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

ReleaseNotes.displayName = 'ReleaseNotes';

function mapStateToProps(state) {
    return {
        settings: state.settings
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ReleaseNotes);
