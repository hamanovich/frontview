import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import lifecycle from 'recompose/lifecycle';

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

const MediaImage = styled(Image)`
  width: 100px;
  height: 100px;
  max-width: 100px;
`;

const enhance = compose(
  connect(null, {
    getUser,
    updateUser,
  }),

  reduxForm({
    form: 'AccountEdit',
    validate,
  }),

  withState('isLoading', 'setLoading', false),

  lifecycle({
    componentDidMount() {
      const { getUser, user, initialize } = this.props;

      getUser(user.username)
        .then(res => initialize(res.user));
    },
  }),

  withHandlers({
    onSubmit: props => (values) => {
      const { updateUser, history, setLoading } = props;

      setLoading(true);

      updateUser(values)
        .then(() => history.push('/me'))
        .catch(() => setLoading(false));
    },
  }),
);

const AccountEdit = ({
  isLoading, handleSubmit, onSubmit, user,
}) => (
  <section>
    <PageHeader>
      <FontAwesome name="pencil-square-o" />
      {' '}
Edit your account
    </PageHeader>

    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Media>
        <Media.Left>
          <MediaImage
            src={user.gravatar}
            thumbnail
          />
        </Media.Left>
        <Media.Body>
          <Media.Heading>Gravatar image</Media.Heading>
          <p>
A Gravatar is a
            <b>G</b>
lobally
            <b>R</b>
ecognized
            <b>Avatar</b>
. You upload it and create your profile just once, and then when you participate in any Gravatar-enabled site, your Gravatar image will automatically follow you there.
          </p>
          <p>
To change avatar:
            <a href="https://gravatar.com" target="_blank" rel="noopener noreferrer">Go to gravatar</a>
          </p>
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
      >
Update profile
      </Button>
    </Form>
  </section>
);

const {
  func, shape, string, bool,
} = PropTypes;

AccountEdit.propTypes = {
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  isLoading: bool.isRequired,
  user: shape({
    username: string,
    gravatar: string,
  }).isRequired,
};

export default enhance(AccountEdit);