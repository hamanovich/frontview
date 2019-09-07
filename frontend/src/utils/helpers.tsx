import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import IconLoader from '../components/shared/IconLoader';
import Authorization from './Authorization';
import { RoleEnum } from '../propTypes';

export const isLoggedIn = Authorization();
export const Customer = Authorization(['user', 'owner', 'admin', 'superadmin']);
export const Owner = Authorization(['owner', 'admin', 'superadmin']);
export const Admin = Authorization(['admin', 'superadmin']);
export const Superadmin = Authorization(['superadmin']);

export const isSuperAdmin = (role: string = 'user') =>
  role === RoleEnum.SUPERADMIN;

export const isAdmin = (role: string = 'user') =>
  role === RoleEnum.ADMIN || role === RoleEnum.SUPERADMIN;

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
    <Component {...(props as any)} />
  </Suspense>
);
