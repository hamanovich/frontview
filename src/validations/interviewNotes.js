import isEmpty from 'lodash/isEmpty';

export default (values) => {
  const errors = {};

  if (!values.notes) {
    errors.notes = 'Private notes must not be empty';
  }

  errors.isValid = isEmpty(errors);

  return errors;
};