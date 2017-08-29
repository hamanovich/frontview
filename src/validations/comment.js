import isEmpty from 'lodash/isEmpty';

export default (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Username is required';
  }

  if (!values.topic) {
    errors.topic = 'Topic is required';
  }

  if (!values.comment) {
    errors.comment = 'Comment is required';
  }

  errors.isValid = isEmpty(errors);

  return errors;
};