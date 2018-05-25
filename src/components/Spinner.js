import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showSpinner, hideSpinner } from '../actions/'

class Spinner extends Component {

    render() {
        return (
            <div className={this.props.show ? "loaderWrapper" : "loaderWrapper hide"}>
                <div className="innerLoaderWrapper">
                    <img src="../assets/images/loading.gif" />
                </div>
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