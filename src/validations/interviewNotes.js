import isEmpty from 'lodash/isEmpty';

export default (values) => {
  const errors = {};

  if (!values.result) {
    errors.result = 'Private notes must not be empty';
  }

  errors.isValid = isEmpty(errors);

  return errors;
};