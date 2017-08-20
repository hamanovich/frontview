import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { login } from '../../actions/auth';

import LoginForm from './LoginForm';

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  render() {
    const { login } = this.props;

    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <h1>Please, login</h1>
          <LoginForm login={login} />
        </Col>
      </Row>
    );
  }
}

export default connect(null, { login })(LoginPage);