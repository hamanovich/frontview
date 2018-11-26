import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import User from '../models/user';
import { send } from '../handlers/mail';

import validate from '../validations/signup';

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
    isValid: isEmpty(errors),
  };
};

exports.createUser = async (req, res) => {
  const { errors, isValid } = await validateUser(req.body, validate);
  const { username, email, password } = req.body;
  const passwordDigest = bcrypt.hashSync(password, 10);

  if (!isValid) {
    res.status(409).json(errors);
  }

  const user = new User({
    username,
    email,
    passwordDigest,
    confirmationToken: bcrypt.hashSync(process.env.SECRET, 10).replace(/\//g, ''),
  });

  await user.save(err => {
    if (err) {
      const { username, email } = err.errors;

      return res.status(500).json({
        username: username && username.message,
        email: email && email.message,
      });
    }

    return true;
  });

  send({
    user,
    from: `FrontView <something@sparkpostbox.com>`,
    filename: 'confirmation-email',
    subject: 'Confirmation Email',
    confirmURL: `${req.protocol}://${req.get('host')}/confirmation/${user.confirmationToken}`,
  });

  res.send(user);
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    $or: [{ username: req.params.identifier }, { email: req.params.identifier }],
  }).populate('qlists');

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
      qlists: user.qlists,
    };

    res.json(userData);
    return;
  }

  res.json({ error: "User didn't find" });
};

exports.updateUser = async (req, res) => {
  const { errors, isValid } = await validateUser(req.body, validate);
  const passwordDigest = bcrypt.hashSync(req.body.password, 10);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const userOne = await User.findOneAndUpdate(
    { username: req.params.username },
    { ...req.body, passwordDigest },
    { new: true },
  );

  await userOne.save();

  res.json({ success: true });
};

exports.remove = async (req, res) => {
  await User.remove({ username: req.params.username });

  res.json({ succes: true });
};
