import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';

import rootReducer from './reducers';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/auth';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('frontview')
);

registerServiceWorker();
