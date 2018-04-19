import React, { Component } from 'react';

class AutoUpdater extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="autoUpdaterWrapper">
                <div id="AutoUpdater">
                    <h2>Checking For Updates</h2>
                    <div className="progress hide">
                        <div className="progress-bar"></div>
                    </div>
                </div>
                <div id="updaterInstaller" className="hide">
                    <h3>Update downloaded.  Click update to begin.</h3>
                    <button type="submit" id="installerUpdateButton">Update</button>
                </div>
            </div>
        );
    }
}

export default AutoUpdater;
