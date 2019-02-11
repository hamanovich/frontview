import React from 'react';
import { func } from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Login from './Login';
import Forgot from './Forgot';
import Reset from './Reset';

import { login, forgot, resetToken, getReset } from '../../actions/auth';
import { getUser } from '../../actions/signup';
import { addFlashMessage } from '../../actions/flash';

import { PropsRoute } from '../../utils/helpers';

export const LoginPage = ({ login, forgot, resetToken, getReset, getUser, addFlashMessage }) => (
  <Row>
    <Helmet>
      <title>Frontview: Please, login</title>
    </Helmet>
    <Col md={6} mdOffset={3}>
      <Switch>
        <PropsRoute exact path="/login" component={Login} login={login} getUser={getUser} />

        <PropsRoute exact path="/login/forgot" component={Forgot} forgot={forgot} />

        <PropsRoute
          path="/login/reset/:token"
          component={Reset}
          resetToken={resetToken}
          getReset={getReset}
          addFlashMessage={addFlashMessage}
        />

        <Redirect to="/login" />
      </Switch>
    </Col>
  </Row>
);

LoginPage.propTypes = {
  login: func.isRequired,
  forgot: func.isRequired,
  resetToken: func.isRequired,
  getReset: func.isRequired,
  getUser: func.isRequired,
  addFlashMessage: func.isRequired,
};

export default connect(
  null,
  {
    login,
    forgot,
    resetToken,
    getReset,
    getUser,
    addFlashMessage,
  },
)(LoginPage);
