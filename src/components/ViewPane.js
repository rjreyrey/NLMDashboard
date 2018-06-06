import React, { Component } from 'react';
import Login from './Login';
import Tabbar from './Tabbar';
import Webviews from './Webviews';
import Spinner from './Spinner';

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

ViewPane.displayName = 'ViewPane';

export default ViewPane;
