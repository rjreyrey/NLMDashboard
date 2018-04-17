import React, { Component } from 'react';
import Sidebar from './Sidebar';
import ViewPane from './ViewPane';
import VersionNumber from './VersionNumber';

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <Sidebar />
                <ViewPane />
                <VersionNumber />
            </div>
        );
    }
}

export default Content;
