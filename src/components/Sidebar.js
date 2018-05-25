import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { addApplication, findAccount, fetchServices, activateSidebar, showEnterpriseSearch, fetchAccounts } from '../actions/'
import ApplicationList from './ApplicationList';
import availableBUs from '../reducers/availableBUs';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = { buSwitcher: false };
    }

    onBUClick(name, sys, store, branch, enterpriseName) {
        this.props.fetchAccounts(name, sys, store, branch, enterpriseName);
    }

    toggleBUSwticther() {
        this.setState({ ...this.state, buSwitcher: !this.state.buSwitcher });
    }

    onHover() {
        this.setState({ ...this.state, buSwitcher: true });
    }

    onHoverOut() {
        this.setState({ ...this.state, buSwitcher: false });
    }

    render() {
        return (
            <div id="sidebar" className={this.props.account.id > 0  ? "sidebar": "sidebar hidden" }>
                {(() => {
                    if (this.props.account.id > 0 && this.props.account.active == true) {
                        var associatedBUs = this.props.availableBUs.filter((bu) => { return bu.EnterpriseName == this.props.account.enterprise && bu.Name != this.props.account.name })
                        return (
                            <div className="sidebarSection">
                                <div className="sidebarSectionHeading">Business Unit</div>
                                <div onMouseEnter={() => this.onHover()} onMouseLeave={() => this.onHoverOut()}>
                                    <div className="accountName" data-id={this.props.account.id} data-type={this.props.account.type}>{this.props.account.name}<div className="changeAccount" onClick={() => this.toggleBUSwticther()}><i className={ this.state.buSwitcher ? "fas fa-chevron-up" : "fas fa-chevron-down" }></i></div></div>

                                <div className={ this.state.buSwitcher ? "buSwitcher" : "buSwitcher hide"}>
                                    <div className="otherBUsWrapper">
                                        <div className="button" onClick={() => { this.toggleBUSwticther(); this.props.showEnterpriseSearch() }}>Search Business Units <i className="fas fa-search"></i></div>
                                            <div className="otherBUsInner">
                                                {associatedBUs.map((bu) => {
                                                    var key = bu.Name + '_' + bu.StoreNo + '_' + bu.BranchNo;

                                                    if (bu.EnterpriseName == this.props.account.enterprise) {
                                                        return (
                                                            <div className="otherBUs" key={key} onClick={() => { this.toggleBUSwticther(); this.onBUClick(bu.Name, bu.PPSysId, bu.StoreNo, bu.BranchNo, bu.EnterpriseName) }}>{bu.Name}</div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                    }
                })()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        account: state.account,
        availableBUs: state.availableBUs
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addApplication: addApplication,
        findAccount: findAccount,
        fetchServices: fetchServices,
        fetchAccounts: fetchAccounts,
        activateSidebar: activateSidebar,
        showEnterpriseSearch: showEnterpriseSearch
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Sidebar);
