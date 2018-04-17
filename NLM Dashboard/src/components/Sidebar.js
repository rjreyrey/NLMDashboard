﻿import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { addApplication, findAccount } from '../actions/'
import ApplicationList from './ApplicationList';

class Sidebar extends Component {

    render() {
        return (
            <div id="sidebar" className="sidebar">
                {(() => {
                    if (this.props.account.id > 0) {
                        return (   
                            <div className="sidebarSection">
                                <div className="sidebarSectionHeading">Account</div>
                                <div className="accountName">{this.props.account.name}</div>
                                <div className="sidebarSectionHeading">Applications</div>
                                <div className="sidebarSectionList">
                                    <ApplicationList></ApplicationList>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="findAccountWrapper">
                                <button type='submit' onClick={() => Promise.resolve(this.props.findAccount(this.props.account)).then(this.props.addApplication())}>Find Account</button>
                            </div>
                        )
                    }
                })()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        account: state.account
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addApplication: addApplication,
        findAccount: findAccount
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Sidebar);
