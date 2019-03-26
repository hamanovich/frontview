import React, { Fragment, FC } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import lifecycle from 'recompose/lifecycle';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Media from 'react-bootstrap/Media';

import { TextField, TextareaField } from '../formElements';

import validate from '../../validations/account';

import { getUser, updateUser } from '../../actions/auth';
import { MediaImage } from './style';
import {
  AccountEditProps,
  AccountEditLifecycleProps,
  AccountEditHandlersProps,
} from './models';

const enhance = compose<AccountEditProps, {}>(
  connect(
    null,
    {
      getUser,
      updateUser,
    },
  ),

  reduxForm({
    form: 'AccountEdit',
    validate,
  }),

  withState('isLoading', 'setLoading', false),

  lifecycle<AccountEditLifecycleProps, {}>({
    componentDidMount() {
      const { getUser, user, initialize } = this.props;

      getUser(user.username).then((res: any) => initialize(res.user));
    },
  }),

  withHandlers({
    onSubmit: (props: AccountEditHandlersProps) => (values: any) => {
      const { updateUser, history, setLoading } = props;

      setLoading(true);

      updateUser(values)
        .then(() => history.push('/me'))
        .catch(() => setLoading(false));
    },
  }),
);

const AccountEdit: FC<AccountEditProps> = ({
  isLoading,
  handleSubmit,
  onSubmit,
  user,
}) => (
  <Fragment>
    <h1>
      <FontAwesome name="pencil-square-o" /> Edit your account
    </h1>

    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Media>
        <MediaImage src={user.gravatar} alt="" className="mr-3" />
        <Media.Body>
          <h5>Gravatar image</h5>
          <p>
            A Gravatar is a<b>G</b>lobally <b>R</b>ecognized <b>Avatar</b>. You
            upload it and create your profile just once, and then when you
            participate in any Gravatar-enabled site, your Gravatar image will
            automatically follow you there.
          </p>
          <p>
            To change avatar:{' '}
            <a
              href="https://gravatar.com"
              target="_blank"
              rel="noopener noreferrer">
              {' '}
              Go to gravatar
            </a>
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

      <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
        Update profile
      </Button>
    </Form>
  </Fragment>
);

export default enhance(AccountEdit);
