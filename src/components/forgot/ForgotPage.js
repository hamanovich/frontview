import React, { Component } from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import ForgotForm from './ForgotForm';

class ForgotPage extends Component {
  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <h1>Forgot your password? <br /> Don't worry!</h1>
          <p>Just put your email and we will send you instructions.</p>
          <ForgotForm />
        </Col>
      </Row>
    );
  }
}

export default ForgotPage;