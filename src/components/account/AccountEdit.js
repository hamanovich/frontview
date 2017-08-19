import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import TextField from '../formElements/TextField';
import TextareaField from '../formElements/TextareaField';

import validate from '../../validations/accountEdit';

class AccountEdit extends Component {
  state = {
    username: 'hamanovich',
    email: '',
    first_name: '',
    last_name: '',
    primary_skill: '',
    job_function: '',
    notes: '',
    password: '',
    passwordConfirmation: '',
    errors: {},
    isLoading: false
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Edit your account</h1>
        <Form onSubmit={this.onSubmit} noValidate>
          <Field
            label="Username*:"
            component={TextField}
            type="text"
            name="username"
            placeholder="Type your nickname"
            onChange={this.onChange}
          />

          <Field
            label="Email*:"
            component={TextField}
            type="email"
            name="email"
            placeholder="Type your email"
            onChange={this.onChange}
          />

          <Row>
            <Col sm={6}>
              <Field
                label="First name:"
                component={TextField}
                type="text"
                name="first_name"
                placeholder="Type your first name"
                onChange={this.onChange}
              />
            </Col>

            <Col sm={6}>
              <Field
                label="Last name:"
                component={TextField}
                type="text"
                name="last_name"
                placeholder="Type your surname"
                onChange={this.onChange}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <Field
                label="Primary skill:"
                component={TextField}
                type="text"
                name="primary_skill"
                placeholder="Type your primary skill"
                onChange={this.onChange}
              />
            </Col>

            <Col sm={6}>
              <Field
                label="Job function:"
                component={TextField}
                type="text"
                name="job_function"
                placeholder="Type your job function"
                onChange={this.onChange}
              />
            </Col>
          </Row>

          <Field
            label="Notes"
            name="notes"
            component={TextareaField}
            placeholder="Add some notes, if needed"
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

          <Button type="submit" bsStyle="primary" bsSize="large">Update profile</Button>
        </Form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'accountEdit',
  validate
})(AccountEdit);