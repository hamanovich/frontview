import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers';
import { setAuthorizationToken } from './utils/helpers';
import { setCurrentUser } from './actions/auth';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

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

if (localJwtToken) {
  setAuthorizationToken(localJwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localJwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('frontview')
);

registerServiceWorker();
