import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import equals from 'validator/lib/equals';
import isEmpty from 'lodash/isEmpty';

export default values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Username is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (values.email && !isEmail(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (values.phone && !isMobilePhone(values.phone, 'any')) {
    errors.phone = 'Mobile phone is invalid';
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
