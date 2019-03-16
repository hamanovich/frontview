import { FormErrors } from 'redux-form';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import isEmpty from 'lodash/isEmpty';

interface Values {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  isValid: boolean;
}

export default (values: Values): FormErrors => {
  const errors: Values = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isValid: false,
  };

  if (!values.username) {
    errors.username = 'Username is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (values.email && !isEmail(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Confirmation is required';
  }

  if (
    values.password &&
    values.passwordConfirmation &&
    !equals(values.password, values.passwordConfirmation)
  ) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  errors.isValid = isEmpty(errors);

  return errors;
};
