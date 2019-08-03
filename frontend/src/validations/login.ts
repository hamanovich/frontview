import { FormErrors } from 'redux-form';

interface Values {
  identifier: string;
  password: string;
  isValid: boolean;
}
export default (values: Values): FormErrors => {
  const errors: Values = {
    identifier: '',
    password: '',
    isValid: false,
  };

  if (!values.identifier) {
    errors.identifier = 'Username or Email is required';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  errors.isValid = Object.keys(errors).length === 0;

  return errors;
};
