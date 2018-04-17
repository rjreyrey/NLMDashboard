import React, { Component } from 'react';
//window.$ = global.jQuery = require('../../assets/js/jquery.min.js');
import AutoUpdater from './AutoUpdater';
import Login from './Login';
import Webviews from './Webviews';
import Spinner from './Spinner';

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

                <Webviews />
                <Spinner />
            </div>
        )
    }
}

export default ViewPane;
