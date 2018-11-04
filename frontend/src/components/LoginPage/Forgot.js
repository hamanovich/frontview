import React, {Fragment} from 'react';
import { shape, func, string, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import { TextField } from '../formElements';

import validate from '../../validations/forgot';

const enhance = compose(
  reduxForm({
    form: 'Forgot',
    validate,
  }),

  withState('state', 'setState', {
    error: '',
    emailed: '',
    isLoading: false,
  }),

  withHandlers({
    onSubmit: props => email => {
      const { forgot, setState } = props;

      setState({
        error: '',
        isLoading: true,
      });

      forgot(email)
        .then(res =>
          setState({
            emailed: res.emailed,
            isLoading: false,
          }),
        )
        .catch(err =>
          setState({
            error: err.response.data.error,
            isLoading: false,
          }),
        );
    },
  }),
);

const Forgot = ({ handleSubmit, onSubmit, state }) => (
  <Fragment>
    <PageHeader>
      Forgot your password?
      <br /> Don&apos;t worry!
    </PageHeader>
    <p>Just put your email and we will send you instructions.</p>

    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      {state.emailed && <Alert bsStyle="success">{state.emailed}</Alert>}
      {state.error && <Alert bsStyle="danger">{state.error}</Alert>}

      <Field
        label="Email*:"
        component={TextField}
        type="email"
        name="email"
        placeholder="Type your email"
      />

      <Button type="submit" bsStyle="warning" bsSize="large" disabled={state.isLoading}>
        Send a reset
      </Button>
    </Form>
  </Fragment>
);

Forgot.propTypes = {
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  state: shape({
    emailed: string,
    error: string,
    isLoading: bool.isRequired,
  }).isRequired,
};

export default enhance(Forgot);
