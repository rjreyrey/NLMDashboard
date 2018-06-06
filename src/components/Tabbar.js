import React, { Component } from 'react';
import DOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clickTab, closeTab, setNewActiveApp } from '../actions/';

class Tabbar extends Component {

    constructor(props) {
        super(props);
        this.state = { currentTabCount: 0 };
    }

    handleTabClick(event, tab) {
        if (tab) {
            if (event.button === 1) {
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
                <div id={tab.id} className={tab.partition === partition ? tab.active ? 'tab active associated' : 'tab associated' : tab.active? 'tab active' : 'tab'} key={tab.id}>
                    <div onMouseDown={(event) =>  this.handleTabClick(event, tab) } className="title">{tab.title}</div>
                    <div className="close" onClick={(event) => Promise.resolve(this.props.closeTab(tab)).then(this.props.setNewActiveApp(this.props.apps)).then(this.handleTabClick(event, this.props.tabs.find(function (tab) { return tab.autoChosen === true; }))) }><i className="fas fa-times"></i></div>
                </div>
            );


        });
    }

    onWheel(e) {
        e.preventDefault();
        let rawData = e.deltaY ? e.deltaY : e.deltaX;
        let mouseY = Math.floor(rawData) / 2;
        let el = DOM.findDOMNode(this.hScrollParent);
        let scroller = el.firstElementChild;

        if (scroller.offsetWidth > el.offsetWidth) {
            el.scrollLeft += mouseY;
        }
    }

    componentDidUpdate() {
        if (this.props.tabs.length !== this.state.currentTabCount) {
            let el = DOM.findDOMNode(this.hScrollParent);
            el.scrollLeft = el.offsetWidth;
            this.setState({ currentTabCount: this.props.tabs.length });
        }
    }

    render() {
        return (
            <div className="tabbar" onWheel={this.onWheel.bind(this)} ref={r => { this.hScrollParent = r }}>
                <div className="tabsWrapper">
                    {this.createlistItems()}
                </div>
            </div>
        )
    }
}

Tabbar.displayName = 'Tabbar';

function mapStateToProps(state) {
    return {
        tabs: state.tabs,
        apps: state.applications
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        clickTab: clickTab,
        closeTab: closeTab,
        setNewActiveApp: setNewActiveApp
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Tabbar);