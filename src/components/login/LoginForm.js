import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import TextField from '../formElements/TextField';

import validate from '../../validations/login';

class LoginForm extends Component {
  state = {
    identifier: '',
    password: '',
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
          label="Username / Email*:"
          component={TextField}
          type="text"
          htmlFor="identifier"
          name="identifier"
          placeholder="Type your Username or Email"
          onChange={this.onChange}
        />

        <Field
          label="Password*:"
          component={TextField}
          type="password"
          name="password"
          placeholder="Come up with a password"
          onChange={this.onChange}
        />

        <FormGroup>
          <FormControl.Static>
            <Link to="/forgot">Forgot password?</Link>
          </FormControl.Static>
        </FormGroup>

        <Button type="submit" bsStyle="primary" bsSize="large" disabled={isLoading}>Login</Button>
      </Form>
    );
  }
}

export default reduxForm({ 
  form: 'login', 
  validate 
})(LoginForm);
