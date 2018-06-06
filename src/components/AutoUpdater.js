import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AutoUpdater extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.showUpdater ? "autoUpdaterWrapper" : "autoUpdaterWrapper hide"}>
                <div id="AutoUpdater">
                    <h2>{this.props.autoUpdater.headerText}</h2>
                    <div className={parseInt(this.props.autoUpdater.percentComplete) > 0 ? "progress" : "progress hide"}>
                        <div className="progress-bar" style={{width: parseInt(this.props.autoUpdater.percentComplete) + '%'}}></div>
                    </div>
                </div>
            </div>
        );
    }
}

AutoUpdater.displayName = 'AutoUpdater';

function mapStateToProps(state) {
    return {
        autoUpdater: state.autoUpdater
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AutoUpdater);
