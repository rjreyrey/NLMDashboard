import React from 'react';
import ReactDOM from 'react-dom';
import VersionNumber from './components/VersionNumber';
import Sidebar from './components/Sidebar';
import Titlebar from './components/Titlebar';

ReactDOM.render(<Titlebar />, document.getElementById('titlebar'));
ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
ReactDOM.render(<VersionNumber />, document.getElementById('versionNumber'));
