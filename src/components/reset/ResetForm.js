import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import TextField from '../formElements/TextField';

import validate from '../../validations/reset';

class ResetForm extends Component {
  state = {
    password: '',
    passwordConfirmation: '',
    errors: {},
    isLoading: false
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { isLoading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} noValidate>
        <Field
          label="Password*:"
          component={TextField}
          type="password"
          name="password"
          placeholder="Enter a new password"
          onChange={this.onChange}
        />

        <Field
          label="Confirm your Password*:"
          component={TextField}
          type="password"
          name="passwordConfirmation"
          placeholder="Repeat your mad password"
          onChange={this.onChange}
        />

        <Button type="submit" bsStyle="warning" bsSize="large" disabled={isLoading}>Reset</Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'reset',
  validate
})(ResetForm);