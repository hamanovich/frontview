import React, { Fragment } from 'react';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { confirm, getUser } from '../../actions/auth.ts';
import { addFlashMessage } from '../../actions/flash.ts';

const enhance = compose(
  connect(
    null,
    {
      confirm,
      getUser,
      addFlashMessage,
    },
  ),

  withState('success', 'setSuccess', false),

  lifecycle({
    componentDidMount() {
      const {
        confirm,
        getUser,
        addFlashMessage,
        match,
        setSuccess,
      } = this.props;

      confirm(match.params.token)
        .then(() => getUser(jwtDecode(window.localStorage.jwtToken).username))
        .then(() => setSuccess(true))
        .catch(err =>
          addFlashMessage({
            type: 'error',
            text:
              err.response && err.response.data.error
                ? err.response.data.error
                : `${err.message}. Please check your internet connection`,
          }),
        );
    },
  }),

  pure,
);

const Confirmation = ({ success }) => (
  <Jumbotron>
    <Container>
      <h1>Hey!</h1>
      <p className="lead">
        The goal of this project is to provide a convenient way to prepare and
        conduct technical interview in Frontend discipline.
      </p>
      {success && (
        <Fragment>
          <hr />
          <p className="lead">
            <Link to="/">
              <Button variant="success" size="lg">
                Welcome on board!
              </Button>
            </Link>
          </p>
        </Fragment>
      )}
    </Container>
  </Jumbotron>
);

Confirmation.propTypes = {
  success: bool.isRequired,
};

export default enhance(Confirmation);
