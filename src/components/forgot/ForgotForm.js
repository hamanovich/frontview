import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import TextField from '../formElements/TextField';

import validate from '../../validations/forgot';

class ForgotForm extends Component {
  state = {
    email: '',
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
          label="Email*:"
          component={TextField}
          type="email"
          name="email"
          placeholder="Type your email"
          onChange={this.onChange}
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