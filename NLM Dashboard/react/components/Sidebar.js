import React, { Component } from 'react';
window.$ = global.jQuery = require('../../assets/js/jquery.min.js');
const electron = window.require("electron")
import { ipcRenderer } from 'electron';

const data = {
    account: 'Rey Motors',
    appList: [
        { id: 1, name: 'Aptus', url: 'https://web.dealer.nakedlime.com/WebAnalytics/Index/100917?currentAccountId=100155', active: false, opened: false },
        { id: 2, name: 'MMS', url: 'https://mms.aimdatabase.com', active: false, opened: false },
        { id: 3, name: 'SRM', url: 'https://micrositesbyu.com/Login.aspx', active: false, opened: false },
        { id: 4, name: 'Google Analytics', url: 'https://analytics.google.com/', active: false, opened: false },
        { id: 5, name: 'Marketing', url: 'https://marketing.dealer.nakedlime.com', active: false, opened: false },
    ]
}

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { apps: data.appList };
        this.childClicked = this.childClicked.bind(this);
    }

    childClicked(key) {
        for (var i = 0; i < data.appList.length; i++) {
            if (data.appList[i].id == key) {
                data.appList[i].active = true;
                data.appList[i].opened = true;
            } else {
                data.appList[i].active = false;
            }
        }

        this.setState({ apps: data.appList });
        ipcRenderer.send('resetControls', '');
    }

    render() {
        var that = this;
        return (
            <div className="sidebarSection">
                <div className="sidebarSectionHeading">Account</div>
                <div className="accountName">{data.account}</div>
                <div className="sidebarSectionHeading">Applications</div>

                <div className="sidebarSectionList">
                    {this.state.apps.map(function (appListItem, index) {
                        return <AppListItem key={appListItem.id} id={appListItem.id} data={appListItem} onChange={that.childClicked} />;
                    })}
                </div>
            </div>
        )
    }
}

class AppListItem extends Component {
    constructor(props) {
        super(props);
        this.loadWindow = this.loadWindow.bind(this);
    }

    loadWindow(event) {
        var id = 'webview_' + this.props.data.id;
        $('.webview').addClass('hide');

        if (!this.props.data.active) {
            if (!this.props.data.opened) {
                document.getElementById(id).src = this.props.data.url;
            } 

            document.getElementById(id).classList.remove('hide');
        } else {
            document.getElementById(id).classList.remove('hide');
        }

        this.props.onChange(this.props.id);
    }

    render() {
        return (
            <div className="sidebarSectionListItem">
                <div className="sidebarSectionListItemLabel">{this.props.data.name}</div>
                <div className="sidebarSectionListItemIFrame" data-url={this.props.data.url} onClick={this.loadWindow} className={this.props.data.active && this.props.data.opened ? 'sidebarSectionListItemIFrame active opened' : this.props.data.active ? 'sidebarSectionListItemIFrame active' : this.props.data.opened ? 'sidebarSectionListItemIFrame opened' : 'sidebarSectionListItemIFrame'}><i className="fas fa-expand"></i></div>
            </div>
        )
    }
}

export default Sidebar;
