import React, { FunctionComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { TextField } from '../formElements';

import validate from '../../validations/login';
import { onSubmitLoginProps, LoginFormError, LoginProps } from './models';

export const onSubmit = (props: onSubmitLoginProps) => (values: any) => {
  const { login, history, getUser, setState } = props;

  setState({
    error: '',
    isLoading: true,
  });

  login(values)
    .then(() => {
      getUser(values.identifier);
      history.push('/');
    })
    .catch((err: LoginFormError) =>
      setState({
        error:
          err.response && err.response.data.error
            ? err.response.data.error
            : `${err.message}. Please check your internet connection`,
        isLoading: false,
      }),
    );
};

const enhance = compose<LoginProps, {}>(
  reduxForm<{}, LoginProps>({
    form: 'Login',
    validate,
  }),

  withState('state', 'setState', {
    error: '',
    isLoading: false,
  }),

  withHandlers({
    onSubmit,
  }),
);

export const Login: FunctionComponent<LoginProps> = ({
  handleSubmit,
  onSubmit,
  state,
}) => (
  <Fragment>
    <h1>
      <FontAwesome name="user-circle-o" /> Please, login
    </h1>

    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      {state.error && <Alert variant="danger">{state.error}</Alert>}
      <Field
        label="Username / Email*:"
        component={TextField}
        type="text"
        htmlFor="identifier"
        name="identifier"
        placeholder="Type your Username or Email"
      />
      <Field
        label="Password*:"
        component={TextField}
        type="password"
        name="password"
        placeholder="Come up with a password"
      />
      <Form.Group>
        <Link to="/login/forgot">Forgot password?</Link>
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={state.isLoading}>
        Login <FontAwesome name="sign-in" />
      </Button>
    </Form>
  </Fragment>
);

export default enhance(Login);
