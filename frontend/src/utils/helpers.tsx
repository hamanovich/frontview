import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import IconLoader from '../components/shared/IconLoader';
import Authorization from './Authorization';

export const isLoggedIn = Authorization();
export const Customer = Authorization(['user', 'owner', 'admin']);
export const Owner = Authorization(['owner', 'admin']);
export const Admin = Authorization(['admin']);

export const PropsRoute = ({ component, ...rest }: any) => (
  <Route
    {...rest}
    render={(routeProps: any) =>
      React.createElement(component, { ...routeProps, ...rest })
    }
  />
);

export const setAuthorizationToken = (token: boolean) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const Waiting = (Component: any) => (props: any) => (
  <Suspense fallback={<IconLoader />}>
    <Component {...props as any} />
  </Suspense>
);
