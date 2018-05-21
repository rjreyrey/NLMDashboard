import React, { Component } from 'react';
import Sidebar from './Sidebar';
import ViewPane from './ViewPane';
import VersionNumber from './VersionNumber';
import AccountSearch from './AccountSearch';
import Settings from './Settings';
import ReleaseNotes from './ReleaseNotes';

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
                <Settings />
                <ReleaseNotes />
            </div>
        );
    }
}

export default Content;
