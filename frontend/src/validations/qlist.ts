import { FormErrors } from 'redux-form';

interface Values {
  title: string;
  notes: string;
  isValid: boolean;
}

export default (values: Values): FormErrors => {
  const errors: Values = {
    title: '',
    notes: '',
    isValid: false,
  };

  if (!values.title) {
    errors.title = 'Title is required';
  }

  if (!values.notes) {
    errors.notes = 'Notes is required';
  }

  errors.isValid = Object.keys(errors).length === 0;

  return errors;
};
