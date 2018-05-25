import React, { Component } from 'react';
import Sidebar from './Sidebar';
import ViewPane from './ViewPane';
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
                <Settings />
                <ReleaseNotes />
            </div>
        );
    }
}

export default Content;
