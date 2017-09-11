import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Image from 'react-bootstrap/lib/Image';
import Media from 'react-bootstrap/lib/Media';

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
    initialize: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    errors: {},
    isLoading: false
  };

  componentDidMount() {
    const { getUser, initialValues, initialize } = this.props;

    if (initialValues.gravatar) return;

    getUser(initialValues.username)
      .then((res) => {
        const { username, email, firstName, lastName, primarySkill, jobFunction, skype, phone, notes } = res.user;
        initialize({ username, email, firstName, lastName, primarySkill, jobFunction, skype, phone, notes });
      });
  }

  onSubmit = (values) => {
    const { updateUser, getUser, initialValues, addFlashMessage, history } = this.props;

    this.setState({ errors: {}, isLoading: true });

    updateUser(values)
      .then(() => {
        addFlashMessage({
          type: 'success',
          text: 'You have updated profile successfully.'
        });

        getUser(initialValues.username).then(() => history.push('/me'));
      })
      .catch(err => this.setState({ errors: err.response, isLoading: false })
      );
  };

  render() {
    const { isLoading } = this.state;
    const { handleSubmit, initialValues } = this.props;

    return (
      <div>
        <PageHeader>
          <FontAwesome name="pencil-square-o" /> Edit your account
        </PageHeader>

        <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
          <Media>
            <Media.Left>
              <Image
                src={initialValues.gravatar}
                style={{ width: 100, height: 100, maxWidth: 100 }}
                thumbnail
              />
            </Media.Left>
            <Media.Body>
              <Media.Heading>Gravatar image</Media.Heading>
              <p>A Gravatar is a <b>G</b>lobally <b>R</b>ecognized <b>Avatar</b>. You upload it and create your profile just once, and then when you participate in any Gravatar-enabled site, your Gravatar image will automatically follow you there.</p>
              <p>To change avatar: <a href="https://gravatar.com" target="_blank" rel="noopener noreferrer">Go to gravatar</a></p>
            </Media.Body>
          </Media>

          <hr />

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
                name="firstName"
                placeholder="Type your first name"
              />
            </Col>

            <Col sm={6}>
              <Field
                label="Last name:"
                component={TextField}
                type="text"
                name="lastName"
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
                name="primarySkill"
                placeholder="Type your primary skill"
              />
            </Col>

            <Col sm={6}>
              <Field
                label="Job function:"
                component={TextField}
                type="text"
                name="jobFunction"
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
            disabled={isLoading}
          >Update profile</Button>
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