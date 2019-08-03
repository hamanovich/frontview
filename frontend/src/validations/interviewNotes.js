export default values => {
  const errors = {};

  if (!values.result) {
    errors.result = 'Private notes must not be empty';
  }

  errors.isValid = Object.keys(errors).length === 0;

  return errors;
};
