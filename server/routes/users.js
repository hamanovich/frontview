import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import User from '../models/user';

import validate from '../../src/validations/signup';
import validateUser from '../validations/user';

exports.createUser = async (req, res) => {
  const { errors, isValid } = await validateUser(req.body, validate);
  const { username, email, password } = req.body;
  const password_digest = bcrypt.hashSync(password, 10);
  let user;

  if (!isValid) {
    res.status(400).json(errors);
  }

  user = await User.create({ username, email, password_digest });

  if (user) {
    res.send(user);
    return;
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
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      primary_skill: user.primary_skill,
      job_function: user.job_function,
      notes: user.notes
    };

    res.json({ user: userData });
    return;
  }

  res.json({ error: 'User didn\'t find' });
};

exports.updateUser = async (req, res) => {
  const { errors, isValid } = await validateUser(req.body, validate);
  const { username, email, password, first_name, last_name, primary_skill, job_function, notes } = req.body;
  const password_digest = bcrypt.hashSync(password, 10);
  let userOne;
  let user;

  if (!isValid) {
    res.status(400).json(errors);
  }

  userOne = await User.findOne({ username: req.params.username });
  userOne.username = username;
  userOne.email = email;
  userOne.first_name = first_name;
  userOne.last_name = last_name;
  userOne.job_function = job_function;
  userOne.primary_skill = primary_skill;
  userOne.notes = notes;
  userOne.password_digest = password_digest;

  await userOne.save();

  user = await User.findOne({ username: req.params.username })

  if (user) {
    res.json({ success: true });
    return;
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
