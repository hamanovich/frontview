import { InjectedFormProps, FormErrors } from 'redux-form';
import isEmpty from 'lodash/isEmpty';

interface Values {
  search: string;
  isValid: boolean;
}

interface SearchProps extends Values {
  props?: InjectedFormProps<any, {}, string>;
}

export default (values: SearchProps): FormErrors => {
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
