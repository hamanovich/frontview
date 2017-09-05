import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Alert from 'react-bootstrap/lib/Alert';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import { TextField } from '../formElements';

import validate from '../../validations/login';

import { login } from '../../actions/auth';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    errors: {},
    isLoading: false
  };

  onSubmit = (values) => {
    const { login } = this.props;

    this.setState({ errors: {}, isLoading: true });

    login(values).then(
      () => this.context.router.history.push('/'),
      err => this.setState({ errors: err.response.data.errors, isLoading: false })
    );
  };

  render() {
    const { handleSubmit } = this.props;
    const { isLoading, errors } = this.state;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
        <PageHeader>
          <FontAwesome name="user-circle-o" /> Please, login
        </PageHeader>

        {errors.form && <Alert bsStyle="danger">{errors.form}</Alert>}

        <Field
          label="Username / Email*:"
          component={TextField}
          type="text"
          htmlFor="identifier"
          name="identifier"
          placeholder="Type your Username or Email"
        />

        <Field
          label="Password*:"
          component={TextField}
          type="password"
          name="password"
          placeholder="Come up with a password"
        />

        <FormGroup>
          <FormControl.Static>
            <Link to="/login/forgot">Forgot password?</Link>
          </FormControl.Static>
        </FormGroup>

        <Button
          type="submit"
          bsStyle="primary"
          bsSize="large"
          disabled={isLoading}
        >Login</Button>
      </Form>
    );
  }
}

export default connect(null, { login })(
  reduxForm({
    form: 'login',
    validate
  })(Login));