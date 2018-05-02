import React, { Component } from 'react';
import Sidebar from './Sidebar';
import ViewPane from './ViewPane';
import VersionNumber from './VersionNumber';
import AccountSearch from './AccountSearch';

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <Sidebar />
                <ViewPane />
                <AccountSearch />
                <VersionNumber />
            </div>
        );
    }
}

export default Content;
