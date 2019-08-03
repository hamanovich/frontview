import React, { FunctionComponent, Fragment } from 'react';
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

import { confirm, getUser } from '../../actions/auth';
import { addFlashMessage } from '../../actions/flash';
import {
  ConfirmationProps,
  ConfirmLifecycleProps,
  ConfirmError,
} from './models';

const enhance = compose<ConfirmationProps, {}>(
  connect(
    null,
    {
      confirm,
      getUser,
      addFlashMessage,
    },
  ),

  withState('success', 'setSuccess', false),

  lifecycle<ConfirmLifecycleProps, {}>({
    componentDidMount() {
      const {
        confirm,
        getUser,
        addFlashMessage,
        match,
        setSuccess,
      } = this.props;

      confirm(match.params.token)
        .then(() =>
          getUser(
            jwtDecode<{ username: string }>(window.localStorage.jwtToken)
              .username,
          ),
        )
        .then(() => setSuccess(true))
        .catch((err: ConfirmError) =>
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

const Confirmation: FunctionComponent<ConfirmationProps> = ({ success }) => (
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

export default enhance(Confirmation);
