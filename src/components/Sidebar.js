import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { addApplication, findAccount, fetchServices, activateSidebar, showEnterpriseSearch } from '../actions/'
import ApplicationList from './ApplicationList';

class Sidebar extends Component {

    render() {
        return (
            <div id="sidebar" className="sidebar">
                {(() => {
                    if (this.props.account.id > 0 && this.props.account.active == true) {
                        return (
                            <div className="sidebarSection">
                                <div className="sidebarSectionHeading">Business Unit</div>
                                <div className="accountName" data-id={this.props.account.id} data-type={this.props.account.type}>{this.props.account.name}<div className="changeAccount" onClick={() => this.props.showEnterpriseSearch()}><i className="fas fa-search"></i></div></div>
                                <div className="sidebarSectionHeading">Account List</div>
                                <div className="sidebarSectionList">
                                    <ApplicationList></ApplicationList>
                                </div>
                            </div>
                        )
                    } else if (this.props.account.loading == true) {
                        return (
                            <div className="sidebarSectionHeading">Loading Services...</div>    
                        )
                    } else {
                        return (
                            <div className="findAccountWrapper">
                                <button type='submit' className="button" onClick={() => this.props.showEnterpriseSearch()}>Find Account</button>
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
        findAccount: findAccount,
        fetchServices: fetchServices,
        activateSidebar: activateSidebar,
        showEnterpriseSearch: showEnterpriseSearch
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Sidebar);
