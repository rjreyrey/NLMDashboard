import React, { Component } from 'react';

const electron = window.require("electron") // little trick to import electron in react
const remote = electron.remote;
const ipcRenderer = electron.ipcRenderer


class VersionNumber extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id= "versionNumber" >
            v { remote.app.getVersion() }
        </div>
    }
}

export default VersionNumber;
