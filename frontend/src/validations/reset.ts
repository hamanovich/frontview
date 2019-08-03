import { FormErrors } from 'redux-form';
import equals from 'validator/lib/equals';

interface Values {
  password: string;
  passwordConfirmation: string;
  isValid: boolean;
}

export default (values: Values): FormErrors => {
  const errors: Values = {
    password: '',
    passwordConfirmation: '',
    isValid: false,
  };

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

  errors.isValid = Object.keys(errors).length === 0;

  return errors;
};
