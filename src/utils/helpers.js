import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Authorization from './Authorization';

export const isLoggedIn = Authorization();
export const User = Authorization(['user', 'owner', 'admin']);
export const Owner = Authorization(['owner', 'admin']);
export const Admin = Authorization(['admin']);

export const PropsRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={
      routeProps => React.createElement(component, { ...routeProps, ...rest })
    }
  />
);

PropsRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};