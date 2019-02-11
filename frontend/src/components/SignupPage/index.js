import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import FontAwesome from 'react-fontawesome';

import { signup, isUserExists } from '../../actions/signup';
import { addFlashMessage } from '../../actions/flash';

import SignupForm from './SignupForm';

export const SignupPage = ({ signup, addFlashMessage, isUserExists }) => (
  <Row>
    <Helmet>
      <title>Frontview: Register. Welcome</title>
    </Helmet>
    <Col md={6} mdOffset={3}>
      <PageHeader>
        <FontAwesome name="user-plus" /> Register. Welcome
      </PageHeader>

      <SignupForm signup={signup} addFlashMessage={addFlashMessage} isUserExists={isUserExists} />
    </Col>
  </Row>
);

SignupPage.propTypes = {
  signup: func.isRequired,
  addFlashMessage: func.isRequired,
  isUserExists: func.isRequired,
};

export default connect(
  null,
  {
    signup,
    addFlashMessage,
    isUserExists,
  },
)(SignupPage);
