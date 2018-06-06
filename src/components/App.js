import React, { Component } from 'react';
import Titlebar from './Titlebar';
import Content from './Content';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Titlebar />
                <Content />
            </div>
        );
    }
}

App.displayName = 'App';

export default App;
