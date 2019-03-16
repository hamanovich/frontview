import React from 'react';
import { func } from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Login from './Login';
import Forgot from './Forgot';
import Reset from './Reset';

import {
  login,
  forgot,
  resetToken,
  getReset,
  getUser,
} from '../../actions/auth.ts';
import { addFlashMessage } from '../../actions/flash.ts';

import { PropsRoute } from '../../utils/helpers';

export const LoginPage = ({
  login,
  forgot,
  resetToken,
  getReset,
  getUser,
  addFlashMessage,
}) => (
  <Container>
    <Helmet>
      <title>Frontview: Please, login</title>
    </Helmet>
    <Row>
      <Col xl={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
        <Switch>
          <PropsRoute
            exact
            path="/login"
            component={Login}
            login={login}
            getUser={getUser}
          />

          <PropsRoute
            exact
            path="/login/forgot"
            component={Forgot}
            forgot={forgot}
          />

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
  </Container>
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
