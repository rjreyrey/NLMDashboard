import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { navigateBack, navigateForward, navigateReload } from '../actions/'

class WebviewControls extends Component {

    render() {
        return (
            <div className={this.props.controls.visible ? 'browserControls' : 'browserControls hidden' }>
                <i className={this.props.controls.canGoBack ? 'fas fa-arrow-left browserBack' : 'fas fa-arrow-left browserBack disabled'} onClick={ this.props.navigateBack }></i>
                <i className={this.props.controls.canGoForward ? 'fas fa-arrow-right browserForward' : 'fas fa-arrow-right browserForward disabled'} onClick={ this.props.navigateForward }></i>
                <i className={this.props.controls.canRefresh ? 'fas fa-redo-alt browserRefresh' : 'fas fa-redo-alt browserRefresh disabled'} onClick={ this.props.navigateReload }></i>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        controls: state.controls
        //webviews: state.webviews
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        navigateBack: navigateBack,
        navigateForward: navigateForward,
        navigateReload: navigateReload
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(WebviewControls);