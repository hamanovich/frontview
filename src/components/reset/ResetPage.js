import React, { Component } from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import ResetForm from './ResetForm';

class ResetPage extends Component {
  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <h1>Reset my password</h1>
          <ResetForm />
        </Col>
      </Row>
    );
  }
}

export default ResetPage;
