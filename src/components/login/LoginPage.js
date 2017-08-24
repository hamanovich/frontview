import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './Login';
import ForgotPage from '../forgot/ForgotPage';
import ResetPage from '../reset/ResetPage';

const LoginPage = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route path="/login/forgot" component={ForgotPage} />
    <Route path="/login/reset/:token" component={ResetPage} />
    <Redirect to="/login" />
  </Switch>
);

export default LoginPage;