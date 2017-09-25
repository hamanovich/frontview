import isEmpty from 'lodash/isEmpty';

export default (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title is required';
  }

  if (!values.notes) {
    errors.notes = 'Notes is required';
  }

  errors.isValid = isEmpty(errors);

  return errors;
};