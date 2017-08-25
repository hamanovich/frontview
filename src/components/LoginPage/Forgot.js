import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import { TextField } from '../formElements';

import validate from '../../validations/forgot';

import { forgot } from '../../actions/auth';

class Forgot extends Component {
  static propTypes = {
    forgot: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  state = {
    emailed: '',
    errors: {},
    isLoading: false
  };

  onSubmit = (email) => {
    const { forgot } = this.props;

    this.setState({ errors: {}, isLoading: true });

    forgot(email).then(
      res => this.setState({ emailed: res.emailed, isLoading: false }),
      err => this.setState({ errors: err.response.data.errors, isLoading: false })
    );
  };

  render() {
    const { isLoading, emailed, errors } = this.state;
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
        <PageHeader>Forgot your password? <br /> Don't worry!</PageHeader>
        <p>Just put your email and we will send you instructions.</p>

        {emailed && <Alert bsStyle="success">{emailed}</Alert>}
        {errors.form && <Alert bsStyle="danger">{errors.form}</Alert>}

        <Field
          label="Email*:"
          component={TextField}
          type="email"
          name="email"
          placeholder="Type your email"
        />

        <Button type="submit" bsStyle="warning" bsSize="large" disabled={isLoading}>Send a reset</Button>
      </Form>
    );
  }
}

export default connect(null, { forgot })(
  reduxForm({
    form: 'forgot',
    validate
  })(Forgot));