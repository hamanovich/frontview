import React from 'react';
import { Route } from 'react-router-dom';

import Authorization from '../utils/Authorization';

export const isLoggedIn = Authorization();
export const User = Authorization(['user', 'owner', 'admin']);
export const Owner = Authorization(['owner', 'admin']);
export const Admin = Authorization(['admin']);

export const PropsRoute = ({ component, ...rest }) => (
  <Route {...rest} render={
    routeProps => React.createElement(component, Object.assign({}, routeProps, rest))
  } />
);