import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import TextField from '../formElements/TextField';
import TextareaField from '../formElements/TextareaField';

import validate from '../../validations/accountEdit';

import { selectUser } from '../../selectors';
import { getUser, updateUser } from '../../actions/signup';
import { addFlashMessage } from '../../actions/flashMessages';

class AccountEdit extends Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      job_function: PropTypes.string,
      primary_skill: PropTypes.string,
      notes: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string
    }).isRequired,
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    username: '',
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

  componentWillMount() {
    const { getUser, user, initialize } = this.props;

    getUser(user.username)
      .then(res => {
        const { username, email, first_name, last_name, primary_skill, job_function, notes } = res.user;
        initialize({ username, email, first_name, last_name, primary_skill, job_function, notes });
        this.setState({ username, email, first_name, last_name, primary_skill, job_function, notes });
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

    const { updateUser, addFlashMessage } = this.props;

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      
      updateUser(this.state).then(
        () => {
          addFlashMessage({
            type: 'success',
            text: 'You have updated profile successfully.'
          });
          this.context.router.history.push('/me');
        },
        err => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  };

  render() {
    const { isLoading } = this.state;

    return (
      <div>
        <h1>Edit your account</h1>

        <Form onSubmit={this.onSubmit} noValidate>
          <Field
            label="Username:"
            component={TextField}
            type="text"
            name="username"
            placeholder="Type your nickname"
            onChange={this.onChange}
            readonly
          />

          <Field
            label="Email:"
            component={TextField}
            type="email"
            name="email"
            placeholder="Type your email"
            onChange={this.onChange}
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
            onChange={this.onChange}
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

          <Button type="submit" bsStyle="primary" bsSize="large" disabled={isLoading}>Update profile</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  if (props.match.url === '/me/edit') {
    return {
      initialValues: selectUser(state),
      user: selectUser(state)
    };
  }

  return { initialValues: {} };
}

export default connect(mapStateToProps, {
  getUser,
  updateUser,
  addFlashMessage
})(reduxForm({
  form: 'accountEdit',
  validate
})(AccountEdit));