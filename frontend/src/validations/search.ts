import { FormErrors } from 'redux-form';
import isEmpty from 'lodash/isEmpty';

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

  errors.isValid = isEmpty(errors);

  return errors;
};
