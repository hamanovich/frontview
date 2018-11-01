import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
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
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, middleware)));
const localJwtToken = window.localStorage.jwtToken;

if (localJwtToken) {
  const jwtDecoded = jwtDecode(localJwtToken);
  setAuthorizationToken(localJwtToken);
  store.dispatch(setCurrentUser(jwtDecoded));
}

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default Root;
