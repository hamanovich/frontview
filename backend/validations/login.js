import isEmpty from 'lodash/isEmpty';

export default values => {
  const errors = {};

  if (!values.identifier) {
    errors.identifier = 'Username or Email is required';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  errors.isValid = isEmpty(errors);

  return errors;
};
