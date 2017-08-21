import isEmpty from 'lodash/isEmpty';
import User from '../models/user';

export default async (data, otherValidations) => {
  const { username, email } = data;
  const { errors } = await otherValidations(data);
  const user = await User.find({ $or: [{ username }, { email }] });

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
};