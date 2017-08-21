import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import TextField from '../formElements/TextField';

import validate from '../../validations/signup';

class SignupForm extends Component {
  static propTypes = {
    userSignup: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
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

  checkUserExists = (e) => {
    const { isUserExists } = this.props;
    const { name, value } = e.target;
    const errors = this.state.errors;

    if (value !== '') {
      isUserExists(value).then((res) => {
        let invalid;

        if (res.data.user) {
          errors[name] = `There is user with such ${name}`;
          invalid = true;
        } else {
          errors[name] = '';
          invalid = false;
        }

        this.setState({ errors, invalid });
      });
    } else {
      errors[name] = '';
      this.setState({ errors });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { addFlashMessage, userSignup } = this.props;

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      userSignup(this.state).then(
        () => {
          addFlashMessage({
            type: 'success',
            text: 'You have signed up successfully'
          });
          this.context.router.history.push('/');
        },
        err => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  render() {
    const { errors, isLoading, invalid } = this.state;

    return (
      <Form onSubmit={this.onSubmit} noValidate>
        <Field
          label="Username*:"
          component={TextField}
          type="text"
          name="username"
          placeholder="Type your nickname"
          onChange={this.onChange}
          handleBlur={this.checkUserExists}
          errorState={errors.username}
        />

        <p className="lead">{errors.username}</p>

        <Field
          label="Email*:"
          component={TextField}
          type="email"
          name="email"
          placeholder="Type your email"
          onChange={this.onChange}
          handleBlur={this.checkUserExists}
          errorState={errors.email}
        />

        <Field
          label="Password*:"
          component={TextField}
          type="password"
          name="password"
          placeholder="Come up with a password"
          onChange={this.onChange}
        />

        <Field
          label="Confirm your Password*:"
          component={TextField}
          type="password"
          name="passwordConfirmation"
          placeholder="Repeat your password"
          onChange={this.onChange}
        />

        <Button type="submit" bsStyle="primary" bsSize="large" disabled={isLoading || invalid}>Register</Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'signup',
  validate
})(SignupForm);
