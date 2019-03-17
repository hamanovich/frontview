import React, { FC, Fragment } from 'react';
import { shape, func, string, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import lifecycle from 'recompose/lifecycle';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { TextField } from '../formElements';

import validate from '../../validations/reset';
import {
  ResetProps,
  ResetFormError,
  ResetHandlersProps,
  ResetLifecycleProps,
} from './model';

const enhance = compose<ResetProps, {}>(
  reduxForm({
    form: 'Reset',
    validate,
  }),

  withState('state', 'setState', {
    error: '',
    isLoading: false,
  }),

  lifecycle<ResetLifecycleProps, {}>({
    componentDidMount() {
      const { getReset, addFlashMessage, match } = this.props;

      getReset(match.params.token).catch((err: ResetFormError) =>
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

  withHandlers({
    onSubmit: (props: ResetHandlersProps) => (values: any) => {
      const { resetToken, addFlashMessage, match, history, setState } = props;

      setState({ errors: {}, isLoading: true });

      resetToken(match.params.token, values)
        .then(res => {
          if (res.error) {
            setState({
              error: res.error,
              isLoading: false,
            });

            return;
          }

          addFlashMessage({
            type: 'success',
            text: 'Password successfully updated. Please re-login',
          });

          history.push('/');
        })
        .catch((err: ResetFormError) =>
          setState({
            error:
              err.response && err.response.data.error
                ? err.response.data.error
                : `${err.message}. Please check your internet connection`,
            isLoading: false,
          }),
        );
    },
  }),
);

const Reset: FC<ResetProps> = ({ handleSubmit, onSubmit, state }) => (
  <Fragment>
    <h1>Reset my password</h1>

    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      {state.error && <Alert variant="danger">{state.error}</Alert>}

      <Field
        label="Password*:"
        component={TextField}
        type="password"
        name="password"
        placeholder="Enter a new password"
      />

      <Field
        label="Confirm your Password*:"
        component={TextField}
        type="password"
        name="passwordConfirmation"
        placeholder="Repeat your mad password"
      />

      <Button
        type="submit"
        variant="warning"
        size="lg"
        disabled={state.isLoading}>
        Reset
      </Button>
    </Form>
  </Fragment>
);

export default enhance(Reset);
