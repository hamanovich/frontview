import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';

import TextField from '../formElements/TextField';

import validate from '../../validations/forgot';

class ForgotForm extends Component {
  static propTypes = {
    forgot: PropTypes.func.isRequired
  };

  state = {
    email: '',
    emailed: '',
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

    const { forgot } = this.props;
    const { email } = this.state;

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      forgot({ email }).then(
        res => this.setState({ emailed: res.emailed, isLoading: false }),
        err => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  };

  render() {
    const { isLoading, emailed, errors } = this.state;
    
    return (
      <Form onSubmit={this.onSubmit} noValidate>
        {emailed && <Alert bsStyle="success">{emailed}</Alert>}
        {errors.form && <Alert bsStyle="danger">{errors.form}</Alert>}

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