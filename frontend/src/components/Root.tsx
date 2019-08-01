import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import { createBrowserHistory } from 'history';

import createRootReducer from '../reducers';
import { setAuthorizationToken } from '../utils/helpers';
import { setCurrentUser } from '../actions/auth';

import App from './App';

import '../index.css';
import { User } from '../propTypes/UserType';

const history = createBrowserHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(thunk, middleware)),
);
const localJwtToken = window.localStorage.jwtToken;

if (localJwtToken) {
  const jwtDecoded: User = jwtDecode(localJwtToken);
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
