import { FormErrors } from 'redux-form';
import isEmpty from 'lodash/isEmpty';

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

  errors.isValid = isEmpty(errors);

  return errors;
};
