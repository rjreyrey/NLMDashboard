import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showSpinner, hideSpinner } from '../actions/'

class Spinner extends Component {

    render() {
        return (
            <div className={this.props.spinner.visible ? 'drawing' : 'drawing hide' } id="spinner">
                <div className="loading-dot"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        spinner: state.spinner
    }
}

export default connect(mapStateToProps)(Spinner);