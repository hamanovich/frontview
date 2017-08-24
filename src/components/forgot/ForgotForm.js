import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';

import TextField from '../formElements/TextField';

import validate from '../../validations/forgot';

class ForgotForm extends Component {
  static propTypes = {
    forgot: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  state = {
    emailed: '',
    errors: {},
    isLoading: false
  };

  onSubmit = (email) => {
    const { forgot } = this.props;

    this.setState({ errors: {}, isLoading: true });

    forgot(email).then(
      res => this.setState({ emailed: res.emailed, isLoading: false }),
      err => this.setState({ errors: err.response.data.errors, isLoading: false })
    );
  };

  render() {
    const { isLoading, emailed, errors } = this.state;
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
        {emailed && <Alert bsStyle="success">{emailed}</Alert>}
        {errors.form && <Alert bsStyle="danger">{errors.form}</Alert>}

        <Field
          label="Email*:"
          component={TextField}
          type="email"
          name="email"
          placeholder="Type your email"
        />

        <Button type="submit" bsStyle="warning" bsSize="large" disabled={isLoading}>Send a reset</Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'forgot',
  validate
})(ForgotForm);