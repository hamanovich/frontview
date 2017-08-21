import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { send } from '../handlers/mail';

exports.auth = async (req, res) => {
  const { identifier, password } = req.body;
  const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

  if (!user) {
    res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    return;
  }

  if (bcrypt.compareSync(password, user.password_digest)) {
    const token = jwt.sign({
      _id: user._id,
      username: user.username,
      email: user.email
    }, process.env.SECRET);

    res.json({ token });
  } else {
    res.status(401).json({ errors: { form: 'Invalid Credentials' } });
  }
};

exports.forgot = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  let resetURL;

  if (!user) {
    res.status(401).json({ errors: { form: 'No account with that email exists' } });
    return;
  }

  user.resetPasswordToken = bcrypt.hashSync(process.env.SECRET, 10).replace(/\//g, '');
  user.resetPasswordExpires = Date.now() + 36000000;

  await user.save();

  resetURL = `http://${req.headers['x-forwarded-host']}/reset/${user.resetPasswordToken}`;

  await send({
    user,
    filename: 'password-reset',
    subject: 'Password Reset',
    resetURL
  });

  res.json({ emailed: 'You have been emailed a password reset link. Please, check your email.' })
};

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    res.status(401).json({ errors: { form: 'Password reset is invalid or expired' } });
    return;
  }

  res.json({ success: true });
};

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body.passwordConfirmation) {
    next();
    return;
  }

  res.json({ errors: { form: 'Passwords do not match!' } });
};

exports.update = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    res.json({ errors: { form: 'Password reset is invalid or expired' } });
    return;
  }

  user.password_digest = bcrypt.hashSync(req.body.password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.json({ user });
};
