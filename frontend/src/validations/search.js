import isEmpty from 'lodash/isEmpty';

export default values => {
  const errors = {};

  if (!values.search) {
    errors.search = 'Search field should not be empty';
  }

  errors.isValid = isEmpty(errors);

  return errors;
};
