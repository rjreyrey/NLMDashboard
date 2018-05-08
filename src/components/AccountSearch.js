import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchBeginEnterprise, fetchEnterprises, fetchBranches, fetchAccounts } from '../actions/'

class AccountSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { enterpriseName: '', branchName: '', ID: '' };
    }

    onEnterpriseSearch(event) {
        event.preventDefault();
        this.props.fetchEnterprises(this.state);
    }

    handleEnterpriseNameChange(event) {
        this.setState({ ...this.state, enterpriseName: event.target.value });
    }

    handleBranchNameChange(event) {
        this.setState({ ...this.state, branchName: event.target.value });
    }

    handleIDChange(event) {
        this.setState({ ...this.state, ID: event.target.value });
    }

    handleEnterpriseClick(name) {
        this.props.fetchBranches(name);
    }

    handleBUClick(sys, store, branch) {
        if (sys.length > 0 && store.length > 0 && branch.length > 0) {
            this.props.fetchAccounts(sys, store, branch);
        }
    }

    render() {
        return (
            <div className={ this.props.accountSearch.visible ? "fullWrapper" : "fullWrapper hide"}>
                <div className="accountSearchWrapper">
                    <div className={this.props.accountSearch.searching ? "searchingCover loaderWrapper" : "searchingCover loaderWrapper hide"}><div className="loader"></div></div>
                    <h2>{this.props.accountSearch.currentSearchItem}</h2>
                    <form>
                        <input className='enterpriseName' type='text' placeholder='Enterprise Name' value={this.state.enterpriseName} onChange={this.handleEnterpriseNameChange.bind(this)} />
                        <input className='branchName' type='text' placeholder='Branch Name' value={this.state.branchName} onChange={this.handleBranchNameChange.bind(this)} />
                        <input className='ID' type='text' placeholder='ID' value={this.state.ID} onChange={this.handleIDChange.bind(this)}  />
                        <input type='submit' value='Search' onClick={this.onEnterpriseSearch.bind(this)} />
                    </form>
                    <div className={this.props.accountSearch.hasEnterpriseData && !this.props.accountSearch.hasBUData ? 'grid' : 'grid hide'}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Branches</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.accountSearch.enterpriseSearchData.map((enterprise) => {
                                        return (
                                            <tr key={guid()}>
                                                <td className='clickable' onClick={() => this.handleEnterpriseClick(enterprise.Name) }>{enterprise.Name}</td>
                                                <td>{enterprise.BranchList}</td>
                                            </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className={this.props.accountSearch.hasBUData && !this.props.accountSearch.hasAccountData ? 'grid' : 'grid hide'}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>PPSYSID</th>
                                    <th>Store Number</th>
                                    <th>Branch Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.accountSearch.buSearchData.map((bu) => {
                                    return (
                                        <tr key={guid()}>
                                            <td className={bu.PPSysId.length > 0 ? 'clickable' : ''} onClick={() => { this.handleBUClick(bu.PPSysId, bu.StoreNo, bu.BranchNo) }}>{bu.Name}</td>
                                            <td>{bu.PPSysId}</td>
                                            <td>{bu.StoreNo}</td>
                                            <td>{bu.BranchNo}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        accountSearch: state.accountSearch
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        searchBeginEnterprise,
        fetchEnterprises: fetchEnterprises,
        fetchBranches: fetchBranches,
        fetchAccounts: fetchAccounts
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AccountSearch);


function guid() {
    var u = '', i = 0;
    while (i++ < 36) {
        var c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1], r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        u += (c == '-' || c == '4') ? c : v.toString(16)
    }
    return u;
}