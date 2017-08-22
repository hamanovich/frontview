import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { userSignup, isUserExists } from '../../actions/signup';
import { addFlashMessage } from '../../actions/flashMessages';

import SignupForm from './SignupForm';

class SignupPage extends Component {
  static propTypes = {
    userSignup: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
  };

  render() {
    const { userSignup, addFlashMessage, isUserExists } = this.props;

    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <h1>Register. Welcome</h1>
          <SignupForm
            userSignup={userSignup}
            addFlashMessage={addFlashMessage}
            isUserExists={isUserExists}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(null, { userSignup, addFlashMessage, isUserExists })(SignupPage);