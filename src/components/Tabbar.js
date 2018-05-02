import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectApplication, addApplication, clickTab, closeTab, setNewActiveApp } from '../actions/'
import { close } from 'original-fs';

class Tabbar extends Component {

    createlistItems() {
        return this.props.tabs.map((tab) => {
            return (
                <div id={tab.id} className={tab.active ? 'tab active' : 'tab'} key={tab.id}>
                    <div  onClick={() => Promise.resolve(this.props.clickTab(tab)).then(this.props.setNewActiveApp(this.props.apps))} className="title">{tab.title}</div>
                    <div className="close" onClick={() => Promise.resolve(this.props.closeTab(tab)).then(this.props.setNewActiveApp(this.props.apps))}><i className="fas fa-times"></i></div>
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
        apps: state.applications
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