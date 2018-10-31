import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import Alert from 'react-bootstrap/lib/Alert';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import { TextField } from '../formElements';

import validate from '../../validations/login';

const enhance = compose(
  reduxForm({
    form: 'Login',
    validate,
  }),

  withState('state', 'setState', {
    error: '',
    isLoading: false,
  }),

  withHandlers({
    onSubmit: props => values => {
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
        .catch(err =>
          setState({
            error: err.response.data.error,
            isLoading: false,
          }),
        );
    },
  }),
);

const Login = ({ handleSubmit, onSubmit, state }) => (
  <Fragment>
    <PageHeader>
      <FontAwesome name="user-circle-o" /> Please, login
    </PageHeader>

    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      {state.error && <Alert bsStyle="danger">{state.error}</Alert>}

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

      <FormGroup>
        <FormControl.Static>
          <Link to="/login/forgot">Forgot password?</Link>
        </FormControl.Static>
      </FormGroup>

      <Button type="submit" bsStyle="primary" bsSize="large" disabled={state.isLoading}>
        Login
        <FontAwesome name="sign-in" />
      </Button>
    </Form>
  </Fragment>
);

const { shape, func, string, bool } = PropTypes;

Login.propTypes = {
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  state: shape({
    error: string,
    isLoading: bool.isRequired,
  }).isRequired,
};

export default enhance(Login);
