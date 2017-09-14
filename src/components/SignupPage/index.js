import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import FontAwesome from 'react-fontawesome';

import { signup, isUserExists } from '../../actions/signup';
import { addFlashMessage } from '../../actions/flash';

import SignupForm from './SignupForm';

const SignupPage = ({ signup, addFlashMessage, isUserExists }) => (
  <Row>
    <Col md={6} mdOffset={3}>
      <PageHeader>
        <FontAwesome name="user-plus" /> Register. Welcome
      </PageHeader>
      <SignupForm
        signup={signup}
        addFlashMessage={addFlashMessage}
        isUserExists={isUserExists}
      />
    </Col>
  </Row>
);

SignupPage.propTypes = {
  signup: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
};

export default connect(null, { signup, addFlashMessage, isUserExists })(SignupPage);