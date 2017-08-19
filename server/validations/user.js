import isEmpty from 'lodash/isEmpty';
import User from '../models/user';

export default (data, otherValidations) => {
  const { errors } = otherValidations(data);
  const { username, email } = data;

  return User.find({ $or: [{ username }, { email }] }).then((user) => {
    if (user) {
      if (user.username === data.username) {
        errors.username = 'There is a user with such username';
      }

      if (user.email === data.email) {
        errors.email = 'There is a user with such email';
      }
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  });
};