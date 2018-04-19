import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WebviewControls from './WebviewControls'

const electron = window.require("electron")
const remote = electron.remote;

class Titlebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchFocused: false
        };

        this.onSearch = this.onSearch.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
    }

    onMaximize() {
        if (remote.getCurrentWindow().isMaximized()) {
            remote.getCurrentWindow().unmaximize();
        } else {
            remote.getCurrentWindow().maximize();
        }
    }

    onMinimize() {
        remote.getCurrentWindow().minimize();
    }

    onClose() {
        remote.getCurrentWindow().close();
    }

    onSearch(event) {
        this.setState({ searchFocused: true});
    }

    closeSearch(event) {
        this.setState({ searchFocused: false });
    }

    openDevTools() {
        remote.getCurrentWindow().openDevTools();
    }

    render() {
        return <div id="titlebar" className="header">
            <div className="inner">
                <div className="headerTitle">
                    <img src="../assets/images/logo.png" alt="Logo" /><div id="nlmTitle" className="bold inline NLMGreen nlmTitle" onDoubleClick={this.openDevTools}>NLM</div>Dashboard
                </div>
                <WebviewControls />
                <div className="dragbar"></div>
                <div className="accountSearch">
                    <form>
                        <div className={this.state.searchFocused ? 'search-wrapper focused' : 'search-wrapper'} onClick={this.onSearch}>
                            <input className="search-input" type="text" placeholder="What are you looking for?" onBlur={this.closeSearch}></input><i className="fas fa-search"></i>
                        </div>
                    </form>
                </div>
                <div className="minimizeApp appControl" onClick={this.onMinimize}><i className="far fa-window-minimize"></i></div>
                <div className="maximizeApp appControl" onClick={this.onMaximize}><i className="far fa-square"></i></div>
                <div className="closeApp appControl" onClick={this.onClose}><i className="fas fa-times"></i></div>
            </div>
        </div>
    }
}

export default Titlebar;
