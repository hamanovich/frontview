import React, { Component } from 'react';
import { func } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import { TextField } from '../formElements';

import validate from '../../validations/signup';

export class SignupForm extends Component {
  static propTypes = {
    signup: func.isRequired,
    reset: func.isRequired,
    addFlashMessage: func.isRequired,
    isUserExists: func.isRequired,
    handleSubmit: func.isRequired,
  };

  state = {
    errors: {
      username: '',
      email: '',
    },
    isLoading: false,
    invalid: false,
  };

  onSubmit = values => {
    const { addFlashMessage, signup, reset } = this.props;

    this.setState({ errors: {}, isLoading: true });

    signup(values)
      .then(() => {
        addFlashMessage({
          type: 'warn',
          text: 'Please, verify your email to confirm',
        });

        reset();
      })
      .catch(err =>
        this.setState({
          errors: err.response
            ? err.response.data
            : {
                username: '',
                email: '',
                errorMsg: err.message,
              },
          isLoading: false,
        }),
      );
  };

  checkUserExists = e => {
    const { isUserExists } = this.props;
    const { name, value } = e.target;
    const { errors } = this.state;

    if (value !== '') {
      isUserExists(value).then(res => {
        let invalid;

        if (res.data.username) {
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

  render() {
    const { errors, isLoading, invalid } = this.state;
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
        <Field
          label="Username*:"
          component={TextField}
          type="text"
          name="username"
          placeholder="Type your nickname"
          onBlur={this.checkUserExists}
          errorState={errors.username}
        />
        <p className="lead">{errors.username}</p>
        <Field
          label="Email*:"
          component={TextField}
          type="email"
          name="email"
          placeholder="Type your email"
          onBlur={this.checkUserExists}
          errorState={errors.email}
        />
        <Field
          label="Password*:"
          component={TextField}
          type="password"
          name="password"
          placeholder="Come up with a password"
        />
        <Field
          label="Confirm your Password*:"
          component={TextField}
          type="password"
          name="passwordConfirmation"
          placeholder="Repeat your password"
        />
        <Button
          type="submit"
          bsStyle="primary"
          bsSize="large"
          disabled={isLoading || invalid || !!(errors.username || errors.email)}>
          Register
          <FontAwesome name="users" />
        </Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'SignupForm',
  validate,
})(SignupForm);
