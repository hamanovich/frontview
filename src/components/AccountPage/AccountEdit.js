import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import { TextField, TextareaField } from '../formElements';

import validate from '../../validations/account';

import { getUser, updateUser } from '../../actions/signup';
import { addFlashMessage } from '../../actions/flash';

class AccountEdit extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    errors: {},
    isLoading: false
  };

  componentWillMount() {
    const { getUser, initialValues, initialize } = this.props;

    getUser(initialValues.username)
      .then((res) => {
        const { username, email, first_name, last_name, primary_skill, job_function, skype, phone, notes } = res.user;
        initialize({ username, email, first_name, last_name, primary_skill, job_function, skype, phone, notes });
      });
  }

  onSubmit = (values) => {
    const { updateUser, addFlashMessage } = this.props;

    this.setState({ errors: {}, isLoading: true });

    updateUser(values).then(
      () => {
        addFlashMessage({
          type: 'success',
          text: 'You have updated profile successfully.'
        });
        this.context.router.history.push('/me');
      },
      err => this.setState({ errors: err.response.data, isLoading: false })
    );
  };

  render() {
    const { isLoading } = this.state;
    const { handleSubmit } = this.props;

    return (
      <div>
        <h1>Edit your account</h1>

        <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
          <Field
            label="Username:"
            component={TextField}
            type="text"
            name="username"
            placeholder="Type your nickname"
            readonly
          />

          <Field
            label="Email:"
            component={TextField}
            type="email"
            name="email"
            placeholder="Type your email"
            readonly
          />

          <Row>
            <Col sm={6}>
              <Field
                label="First name:"
                component={TextField}
                type="text"
                name="first_name"
                placeholder="Type your first name"
              />
            </Col>

            <Col sm={6}>
              <Field
                label="Last name:"
                component={TextField}
                type="text"
                name="last_name"
                placeholder="Type your surname"
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
              />
            </Col>

            <Col sm={6}>
              <Field
                label="Job function:"
                component={TextField}
                type="text"
                name="job_function"
                placeholder="Type your job function"
              />
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <Field
                label="Skype:"
                component={TextField}
                type="text"
                name="skype"
                placeholder="Add skype nickname"
              />
            </Col>

            <Col sm={6}>
              <Field
                label="Phone number:"
                component={TextField}
                type="tel"
                name="phone"
                placeholder="code-##-###-##-##"
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
            disabled={isLoading}>Update profile</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ initialValues: state.auth.user });

export default connect(mapStateToProps, {
  getUser,
  updateUser,
  addFlashMessage
})(reduxForm({
  form: 'accountEdit',
  validate
})(AccountEdit));