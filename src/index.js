import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);
