import isEmail from 'validator/lib/isEmail';
import isEmpty from 'lodash/isEmpty';

export default values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (values.email && !isEmail(values.email)) {
    errors.email = 'Email is invalid';
  }

  errors.isValid = isEmpty(errors);

  return errors;
};
