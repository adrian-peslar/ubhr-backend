import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import { Router, Route } from 'react-router-dom';
import history from './history';
import Main from './Router';
import { initAuthState } from 'UBHR/initAuthState';
import { chatService } from 'UBHR/services/chatService';
const store = configureStore();
initAuthState(store);
chatService(store);

class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route component={Main} />
                </Router>
            </Provider>
        );
    }
}
ReactDOM.render(<Index />, document.getElementById('index'));
