import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';

import TextField from '../formElements/TextField';

import validate from '../../validations/reset';

class ResetForm extends Component {
  static propTypes = {
    resetToken: PropTypes.func.isRequired,
    getReset: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    password: '',
    passwordConfirmation: '',
    errors: {},
    isLoading: false
  };

  componentDidMount() {
    const { router } = this.context;
    const { getReset, addFlashMessage } = this.props;

    getReset(router.route.match.params.token)
      .then((res) => {
        if (!res) {
          addFlashMessage({
            type: 'error',
            text: 'Password reset is invalid or expired'
          });
          router.history.push('/login');
        }
      });
  }

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

    const { router } = this.context;
    const { resetToken } = this.props;
    const { password, passwordConfirmation } = this.state;

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      resetToken(router.route.match.params.token, { password, passwordConfirmation }).then(
        res => router.history.push('/'),
        err => this.setState({ errors: err.response.data.error, isLoading: false }) 
      );
    }
  };

  render() {
    const { errors, isLoading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} noValidate>
        {errors.form && <Alert bsStyle="danger">{errors.form}</Alert>}

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