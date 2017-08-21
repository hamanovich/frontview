import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import TextField from '../formElements/TextField';

import validate from '../../validations/login';

class LoginForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    identifier: '',
    password: '',
    errors: {},
    isLoading: false
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isValid = () => {
    const errors = validate(this.state);

    if (!errors.isValid) {
      this.setState({ errors });
    }

    return errors.isValid;
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { login } = this.props;

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      login(this.state).then(
        () => this.context.router.history.push('/'),
        err => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  };

  render() {
    const { isLoading, errors } = this.state;

    return (
      <Form onSubmit={this.onSubmit} noValidate>
        {errors.form && <Alert bsStyle="danger">{errors.form}</Alert>}

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
