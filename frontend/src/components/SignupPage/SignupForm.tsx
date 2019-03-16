import React, { Component, SyntheticEvent, FormEvent } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { TextField } from '../formElements';

import validate from '../../validations/signup';

import { SignupProps } from './models';

type SignupFormState = {
  errors: {
    username?: string;
    email?: string;
    errorMsg?: string;
    [key: string]: string | undefined;
  };
  isLoading: boolean;
  invalid: boolean;
};

type SignupFormError = {
  message?: string;
  response?: {
    data: {
      error: string;
    };
  };
};

export class SignupForm extends Component<
  SignupProps & InjectedFormProps<{}, SignupProps>,
  SignupFormState
> {
  state: SignupFormState = {
    errors: {
      username: '',
      email: '',
    },
    isLoading: false,
    invalid: false,
  };

  private onSubmit = (values: any) => {
    const { addFlashMessage, signup } = this.props;

    this.setState({ errors: {}, isLoading: true });

    signup(values)
      .then(() => {
        addFlashMessage({
          type: 'warn',
          text: 'Verify your email to confirm',
        });
      })
      .catch((err: SignupFormError) =>
        this.setState({
          errors:
            err.response && err.response.data.error
              ? { errorMsg: err.response.data.error }
              : {
                  username: '',
                  email: '',
                  errorMsg: `${err.message}. Please check your internet connection`,
                },
          isLoading: false,
        }),
      );
  };

  private checkUserExists = (e: FormEvent<HTMLInputElement>) => {
    const { isUserExists } = this.props;
    const { name, value } = e.target as HTMLInputElement;
    const { errors } = this.state;

    if (value !== '') {
      isUserExists(value).then(res => {
        let invalid;

        if (res.data.username) {
          errors[name] = `There is user with such ${name}`;
          invalid = true;
        } else {
          errors[name] = '';
          invalid = false;
        }

        this.setState({ errors, invalid });
      });
    } else {
      errors[name] = '';
      this.setState({ errors });
    }
  };

  render() {
    const { errors, isLoading, invalid } = this.state;
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
        {errors.errorMsg && <Alert variant="danger">{errors.errorMsg}</Alert>}
        <Field
          label="Username*:"
          component={TextField}
          type="text"
          name="username"
          placeholder="Type your nickname"
          onBlur={this.checkUserExists}
          errorState={errors.username}
        />
        <Field
          label="Email*:"
          component={TextField}
          type="email"
          name="email"
          placeholder="Type your email"
          onBlur={this.checkUserExists}
          errorState={errors.email}
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
          variant="primary"
          size="lg"
          disabled={isLoading || invalid || !!(errors.username || errors.email)}>
          Register <FontAwesome name="users" />
        </Button>
      </Form>
    );
  }
}

export default reduxForm<{}, SignupProps>({
  form: 'SignupForm',
  validate,
})(SignupForm);
