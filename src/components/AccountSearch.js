import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchBranches, fetchAccounts, hideEnterpriseSearch } from '../actions/'

class AccountSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { branchName: '', ID: '' };
    }

    onBUSearch(event) {
        event.preventDefault();
        this.props.fetchBranches(this.state);
    }


    handleBranchNameChange(event) {
        this.setState({ ...this.state, branchName: event.target.value });
    }

    handleIDChange(event) {
        this.setState({ ...this.state, ID: event.target.value });
    }

    handleBUClick(name, sys, store, branch, enterpriseName) {
        if (sys.length > 0 && store.length > 0 && branch.length > 0) {
            this.props.fetchAccounts(name, sys, store, branch, enterpriseName);
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        if (this.props.accountSearch.hasBUData && !this.props.accountSearch.searching && this.props.accountSearch.buSearchData.length == 1) {
            var data = this.props.accountSearch.buSearchData[0];

            if (data.PPSysId.length > 0 && data.StoreNo.length > 0 && data.BranchNo.length > 0) {
                this.props.fetchAccounts(data.Name, data.PPSysId, data.StoreNo, data.BranchNo, data.EnterpriseName);
            }
        }
    }

    onCloseClick(event) {
        this.props.hideEnterpriseSearch();
    }

    render() {

        return (
            <div className={this.props.accountSearch.visible ? "fullWrapper" : "fullWrapper hide"}>
                <div className="accountSearchWrapper">
                    <div className={this.props.accountSearch.firstSearch ? "closeSearch hide" : "closeSearch"} onClick={this.onCloseClick.bind(this)}><i className="fas fa-times"></i></div>
                    <div className={this.props.accountSearch.searching ? "searchingCover loaderWrapper" : "searchingCover loaderWrapper hide"}><div className="loader"></div></div>
                    <h2>{this.props.accountSearch.currentSearchItem}</h2>
                    <form>
                        <input className='branchName' type='text' ref={input => input && input.focus()} placeholder='Business Unit' value={this.state.branchName} onChange={this.handleBranchNameChange.bind(this)} />
                        <input className='ID' type='text' placeholder='ID' value={this.state.ID} onChange={this.handleIDChange.bind(this)}  />
                        <input type='submit' value='Search' onClick={this.onBUSearch.bind(this)} />
                    </form>
                    <div className={this.props.accountSearch.hasBUData && !this.props.accountSearch.hasAccountData ? 'grid' : 'grid hide'}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Business Unit</th>
                                    <th>Enterprise</th>
                                    <th>PPSYSID</th>
                                    <th>Store Number</th>
                                    <th>Branch Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.accountSearch.buSearchData.map((bu) => {
                                    return (
                                        <tr key={guid()}>
                                            <td className={bu.PPSysId.length > 0 ? 'clickable' : ''} onClick={() => { this.handleBUClick(bu.Name, bu.PPSysId, bu.StoreNo, bu.BranchNo, bu.EnterpriseName) }}>{bu.Name}</td>
                                            <td>{bu.EnterpriseName}</td>
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
        fetchBranches: fetchBranches,
        fetchAccounts: fetchAccounts,
        hideEnterpriseSearch: hideEnterpriseSearch
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