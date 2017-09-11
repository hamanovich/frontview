import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import { TextField } from '../formElements';

import validate from '../../validations/reset';

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.func.isRequired,
    getReset: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    errors: {},
    isLoading: false
  };

  componentDidMount() {
    const { getReset, addFlashMessage, match, history } = this.props;

    getReset(match.params.token).catch(() => {
      addFlashMessage({
        type: 'error',
        text: 'Password reset is invalid or expired'
      });

      history.push('/login');
    });
  }

  onSubmit = (values) => {
    const { resetToken, addFlashMessage, match, history } = this.props;

    this.setState({ errors: {}, isLoading: true });

    resetToken(match.params.token, values)
      .then((res) => {
        if (res.errors) {
          this.setState({ errors: res.errors, isLoading: false });

          return;
        }

        addFlashMessage({
          type: 'success',
          text: 'Password successfully updated. Please login'
        });

        history.push('/');
      })
      .catch(err => this.setState({ errors: err.response.data.error, isLoading: false }));
  };

  render() {
    const { errors, isLoading } = this.state;
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
        <PageHeader>Reset my password</PageHeader>

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

        <Button
          type="submit"
          bsStyle="warning"
          bsSize="large"
          disabled={isLoading}
        >Reset</Button>
      </Form>
    );
  }
}

export default reduxForm({ form: 'reset', validate })(Reset);