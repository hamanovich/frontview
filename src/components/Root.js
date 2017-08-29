import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import createHistory from 'history/createBrowserHistory';

import rootReducer from '../reducers';
import { setAuthorizationToken } from '../utils/helpers';
import { setCurrentUser } from '../actions/auth';

import App from './App';

import '../index.css';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
const localJwtToken = localStorage.jwtToken;
const jwtDecoded = jwtDecode(localJwtToken);

if (localJwtToken) {
  setAuthorizationToken(localJwtToken);
  store.dispatch(setCurrentUser(jwtDecoded));
}

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App {...this.props} />
    </ConnectedRouter>
  </Provider>
);

export default Root;