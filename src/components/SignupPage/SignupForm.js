import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import { TextField } from '../formElements';

import validate from '../../validations/signup';

class SignupForm extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    errors: {
      username: '',
      email: ''
    },
    isLoading: false,
    invalid: false
  };

  onSubmit = (values) => {
    const { addFlashMessage, signup } = this.props;
    const { history } = this.context.router;

    this.setState({ errors: {}, isLoading: true });

    signup(values)
      .then(() => {
        addFlashMessage({
          type: 'success',
          text: 'You have signed up successfully'
        });

        history.push('/');
      })
      .catch(err => this.setState({ errors: err.response.data, isLoading: false }));
  }

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
          handleBlur={this.checkUserExists}
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
          disabled={isLoading || invalid || !!(errors.username || errors.email)}
        >Register <FontAwesome name="users" /></Button>
      </Form>
    );
  }
}

export default reduxForm({ form: 'signup', validate })(SignupForm);