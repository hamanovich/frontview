import equals from 'validator/lib/equals';
import isEmpty from 'lodash/isEmpty';

export default (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Confirmation is required';
  }

  if (values.password &&
    values.passwordConfirmation &&
    !equals(values.password, values.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  errors.isValid = isEmpty(errors);

  return errors;
};
