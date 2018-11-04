import React, { Fragment } from 'react';
import { shape, func, string, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import lifecycle from 'recompose/lifecycle';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import { TextField } from '../formElements';

import validate from '../../validations/reset';

const enhance = compose(
  reduxForm({
    form: 'Reset',
    validate,
  }),

  withState('state', 'setState', {
    error: '',
    isLoading: false,
  }),

  lifecycle({
    componentDidMount() {
      const { getReset, addFlashMessage, match } = this.props;

      getReset(match.params.token).catch(err =>
        addFlashMessage({
          type: 'error',
          text: err.response.data.error,
        }),
      );
    },
  }),

  withHandlers({
    onSubmit: props => values => {
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
            text: 'Password successfully updated. Please login',
          });

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

const Reset = ({ handleSubmit, onSubmit, state }) => (
  <Fragment>
    <PageHeader>Reset my password</PageHeader>

    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      {state.error && <Alert bsStyle="danger">{state.error}</Alert>}

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

      <Button type="submit" bsStyle="warning" bsSize="large" disabled={state.isLoading}>
        Reset
      </Button>
    </Form>
  </Fragment>
);

Reset.propTypes = {
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  state: shape({
    error: string,
    isLoading: bool.isRequired,
  }).isRequired,
};

export default enhance(Reset);
