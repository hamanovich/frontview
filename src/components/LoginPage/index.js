import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Login from './Login';
import Forgot from './Forgot';
import Reset from './Reset';

import { login, forgot, resetToken, getReset } from '../../actions/auth';
import { addFlashMessage } from '../../actions/flash';

import { PropsRoute } from '../../utils/helpers';

const LoginPage = ({ login, forgot, resetToken, getReset, addFlashMessage }) => (
  <Row>
    <Col md={6} mdOffset={3}>
      <Switch>
        <PropsRoute exact path="/login" component={Login} login={login} />
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
  login: PropTypes.func.isRequired,
  forgot: PropTypes.func.isRequired,
  resetToken: PropTypes.func.isRequired,
  getReset: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default connect(null, { login, forgot, resetToken, getReset, addFlashMessage })(LoginPage);