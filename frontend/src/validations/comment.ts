import { FormErrors } from 'redux-form';

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

  errors.isValid = Object.keys(errors).length === 0;

  return errors;
};
