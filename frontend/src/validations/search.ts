import { FormErrors } from 'redux-form';

interface Values {
  search: string;
  isValid: boolean;
}

export default (values: Values): FormErrors => {
  const errors: Values = {
    search: '',
    isValid: false,
  };

  if (!values.search) {
    errors.search = 'Search field should not be empty';
  }

  errors.isValid = Object.keys(errors).length === 0;

  return errors;
};
