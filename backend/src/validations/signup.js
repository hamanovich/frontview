import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';

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

  errors.isValid = !errors || Object.keys(errors).length === 0;

  return errors;
};
