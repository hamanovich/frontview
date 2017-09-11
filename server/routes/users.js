import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import User from '../models/user';

import validate from '../../src/validations/signup';

const validateUser = async (data, otherValidations) => {
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

exports.createUser = async (req, res) => {
  const { errors, isValid } = await validateUser(req.body, validate);
  const { username, email, password } = req.body;
  const passwordDigest = bcrypt.hashSync(password, 10);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const user = await User.create({ username, email, passwordDigest });

  if (user) {
    res.send(user);
  }
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    $or: [
      { username: req.params.identifier },
      { email: req.params.identifier }
    ]
  });

  if (user) {
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      primarySkill: user.primarySkill,
      jobFunction: user.jobFunction,
      skype: user.skype,
      phone: user.phone,
      notes: user.notes,
      role: user.role,
      gravatar: user.gravatar,
      votes: user.votes,
      qlists: user.qlists
    };

    res.json({ user: userData });
    return;
  }

  res.json({ error: 'User didn\'t find' });
};

exports.updateUser = async (req, res) => {
  const { errors, isValid } = await validateUser(req.body, validate);
  const { username, email, password, firstName, lastName, primarySkill, jobFunction, skype, phone, notes } = req.body;
  const passwordDigest = bcrypt.hashSync(password, 10);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const userOne = await User.findOne({ username: req.params.username });
  userOne.username = username;
  userOne.email = email;
  userOne.firstName = firstName;
  userOne.lastName = lastName;
  userOne.jobFunction = jobFunction;
  userOne.primarySkill = primarySkill;
  userOne.skype = skype;
  userOne.phone = phone;
  userOne.notes = notes;
  userOne.passwordDigest = passwordDigest;

  await userOne.save();

  const user = await User.findOne({ username: req.params.username });

  if (user) {
    res.json({ success: true });
  }
};

exports.remove = async (req, res) => {
  const user = await User.remove({ username: req.params.username });

  if (user) {
    res.json({ succes: true });
    return;
  }

  res.status(500).json({ error: 'User didn\'t remove. It looks this user doesn\'t exist.' });
};