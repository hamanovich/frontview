import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Login from './Login';
import Forgot from './Forgot';
import Reset from './Reset';

const LoginPage = (props) => (
  <Row>
    <Col md={6} mdOffset={3}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/login/forgot" component={Forgot} />
        <Route path="/login/reset/:token" component={Reset} />
        <Redirect to="/login" />
      </Switch>
    </Col>
  </Row>
);

export default LoginPage;