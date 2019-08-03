import { FormErrors } from 'redux-form';
import isEmail from 'validator/lib/isEmail';

interface Values {
  email: string;
  isValid: boolean;
}

export default (values: Values): FormErrors => {
  const errors: Values = {
    email: '',
    isValid: false,
  };

  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (values.email && !isEmail(values.email)) {
    errors.email = 'Email is invalid';
  }

  errors.isValid = Object.keys(errors).length === 0;

  return errors;
};
