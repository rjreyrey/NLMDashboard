import React, { Component } from 'react';
const electron = window.require("electron")
const remote = electron.remote;


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

VersionNumber.displayName = 'VersionNumber';

export default VersionNumber;
