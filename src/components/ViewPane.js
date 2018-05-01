import React, { Component } from 'react';
//window.$ = global.jQuery = require('../../assets/js/jquery.min.js');
import AutoUpdater from './AutoUpdater';
import Login from './Login';
import Webviews from './Webviews';
import Spinner from './Spinner';
import Tabbar from './Tabbar';

class ViewPane extends Component {

    render() {
        return (
            <div className="viewPane">
                <div className="loginPaneWrapper">
                    <div className="container">
                        <AutoUpdater />
                        <Login />
                    </div>
                </div>
                <div className="browser">
                    <Tabbar />
                    <Webviews />
                </div>
                <Spinner />
            </div>
        )
    }
}

export default ViewPane;
