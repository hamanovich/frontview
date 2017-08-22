import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { forgot } from '../../actions/auth';

import ForgotForm from './ForgotForm';

class ForgotPage extends Component {
  static propTypes = {
    forgot: PropTypes.func.isRequired
  };

  render() {
    const { forgot } = this.props;
    
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <h1>Forgot your password? <br /> Don't worry!</h1>
          <p>Just put your email and we will send you instructions.</p>
          <ForgotForm forgot={forgot} />
        </Col>
      </Row>
    );
  }
}

export default connect(null, { forgot })(ForgotPage);