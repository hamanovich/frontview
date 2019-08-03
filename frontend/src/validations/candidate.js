export default values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'First name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  }

  if (!values.primarySkill) {
    errors.primarySkill = 'Primary skill is required';
  }

  if (!values.techLevel) {
    errors.techLevel = 'Technical level is required';
  }

  errors.isValid = Object.keys(errors).length === 0;

  return errors;
};
