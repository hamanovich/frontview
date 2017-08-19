import React, { Component } from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import LoginForm from './LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <h1>Please, login</h1>
          <LoginForm />
        </Col>
      </Row>
    );
  }
}

export default LoginPage;