import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectApplication, addApplication, clickTab, closeTab, setNewActiveApp } from '../actions/';
import { close } from 'original-fs';

class Tabbar extends Component {

    handleTabClick(event, tab) {
        if (tab) {
            if (event.button == 1) {
                Promise.resolve(this.props.closeTab(tab))
                    .then(this.props.setNewActiveApp(this.props.apps));
            } else {
                Promise.resolve(this.props.clickTab(tab))
                    .then(this.props.setNewActiveApp(this.props.apps));
            }
        }
    }

    createlistItems() {
        var activeTab = this.props.tabs.filter((tab) => { return tab.active });
        var partition = null;

        if (activeTab.length > 0) {
            partition = activeTab[0].partition;
        }

        return this.props.tabs.map((tab) => {
            return (
                <div id={tab.id} className={tab.partition == partition ? tab.active ? 'tab active associated' : 'tab associated' : tab.active? 'tab active' : 'tab'} key={tab.id}>
                    <div onMouseDown={(event) =>  this.handleTabClick(event, tab) } className="title">{tab.title}</div>
                    <div className="close" onClick={(event) => Promise.resolve(this.props.closeTab(tab)).then(this.props.setNewActiveApp(this.props.apps)).then(this.handleTabClick(event, this.props.tabs.find(function (tab) { return tab.autoChosen == true; }))) }><i className="fas fa-times"></i></div>
                </div>
            );


        });
    }

    render() {
        return (
            <div className="tabbar">
                {this.createlistItems()}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        tabs: state.tabs,
        apps: state.applications,
        activeApplication: state.ActiveApplication
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectApplication: selectApplication,
        clickTab: clickTab,
        closeTab: closeTab,
        setNewActiveApp: setNewActiveApp
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Tabbar);