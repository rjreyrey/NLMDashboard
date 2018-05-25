import React, { Component } from 'react';
import Login from './Login';
import Webviews from './Webviews';
import Spinner from './Spinner';
import Tabbar from './Tabbar';

class ViewPane extends Component {

    render() {
        return (
            <div className="viewPane">
                <Login />
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
