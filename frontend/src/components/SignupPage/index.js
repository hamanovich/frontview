import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FontAwesome from 'react-fontawesome';

import { signup, isUserExists } from '../../actions/signup';
import { addFlashMessage } from '../../actions/flash';

import SignupForm from './SignupForm';

export const SignupPage = ({ signup, addFlashMessage, isUserExists }) => (
  <Container>
    <Row>
      <Helmet>
        <title>Frontview: Register. Welcome</title>
      </Helmet>
      <Col xl={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
        <h1>
          <FontAwesome name="user-plus" /> Register. Welcome
        </h1>

        <SignupForm signup={signup} addFlashMessage={addFlashMessage} isUserExists={isUserExists} />
      </Col>
    </Row>
  </Container>
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
