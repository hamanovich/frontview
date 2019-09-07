import User from '../models/user';
import validate from '../validations/signup';
import { forbidden } from '../handlers/errors';

const validateNewUser = async (req, res, next) => {
  const { username, email } = req.body;
  const { isValid, ...errors } = await validate(req.body);
  const user = await User.find({ $or: [{ username }, { email }] });

  if (user.length) {
    if (user[0].username === username) {
      errors.username = 'There is a user with such username';
    }

    if (user[0].email === email) {
      errors.email = 'There is a user with such email';
    }
  }

  if (!isValid || Object.keys(errors).length !== 0) {
    res.status(409).json(errors);
  } else {
    next();
  }
};

const validateExistingUser = async (req, res, next) => {
  const { username, email } = req.body;

  if (req.currentUser.username !== username) {
    forbidden(req, res, next, 'Forbidden to modify another user');
    return;
  }

  const user = await User.find({ username, email });

  if (user.length) {
    next();
  } else {
    res.status(400).json(`${username} wasn't found`);
  }
};

export { validateExistingUser, validateNewUser };
