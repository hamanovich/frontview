import { FormErrors } from 'redux-form';
import isEmpty from 'lodash/isEmpty';

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

  errors.isValid = isEmpty(errors);

  return errors;
};
