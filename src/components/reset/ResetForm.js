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
    addFlashMessage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    errors: {},
    isLoading: false
  };

  componentDidMount() {
    const { router } = this.context;
    const { getReset, addFlashMessage } = this.props;
    const failure = () => {
      addFlashMessage({
        type: 'error',
        text: 'Password reset is invalid or expired'
      });
      router.history.push('/login');
    };

    getReset(router.route.match.params.token)
      .then((res) => {
        if (!res) failure();
      })
      .catch(err => failure());
  }

  onSubmit = (values) => {
    const { router } = this.context;
    const { resetToken, addFlashMessage } = this.props;

    this.setState({ errors: {}, isLoading: true });

    resetToken(router.route.match.params.token, values).then(
      (res) => {
        if (res.errors) {
          this.setState({ errors: res.errors, isLoading: false })
          return;
        }

        addFlashMessage({
          type: 'success',
          text: 'Password successfully updated. Please login'
        });
        router.history.push('/');
      },
      err => this.setState({ errors: err.response.data.error, isLoading: false })
    );
  };

  render() {
    const { errors, isLoading } = this.state;
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
        {errors.form && <Alert bsStyle="danger">{errors.form}</Alert>}

        <Field
          label="Password*:"
          component={TextField}
          type="password"
          name="password"
          placeholder="Enter a new password"
        />

        <Field
          label="Confirm your Password*:"
          component={TextField}
          type="password"
          name="passwordConfirmation"
          placeholder="Repeat your mad password"
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