import { FormErrors } from 'redux-form';
import isEmpty from 'lodash/isEmpty';

interface Values {
  username: string;
  topic: string;
  comment: string;
  isValid: boolean;
}

export default (values: Values): FormErrors => {
  const errors: Values = {
    username: '',
    topic: '',
    comment: '',
    isValid: false,
  };

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
