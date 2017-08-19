import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userSignupRequest, isUserExists } from '../../actions/signup';
import { addFlashMessage } from '../../actions/flashMessages';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import SignupForm from './SignupForm';

class SignupPage extends Component {
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
  };

  render() {
    const { userSignupRequest, addFlashMessage, isUserExists } = this.props;

    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <h1>Register. Welcome</h1>
          <SignupForm
            userSignupRequest={userSignupRequest}
            addFlashMessage={addFlashMessage}
            isUserExists={isUserExists}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(null, { userSignupRequest, addFlashMessage, isUserExists })(SignupPage);