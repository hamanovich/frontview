import bcrypt from 'bcrypt';

import User from '../models/user';
import send from '../handlers/mail';

exports.auth = async (req, res) => {
  const { identifier, password } = req.body;
  const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

  if (!user) {
    res.status(401).json({ error: 'Invalid Credentials' });
    return;
  }

  if (!user.confirmed) {
    res.status(401).json({ error: "You didn't confirm your email" });
    return;
  }

  if (bcrypt.compareSync(password, user.passwordDigest)) {
    res.json(user.generateJWT());
  } else {
    res.status(401).json({ error: 'Invalid Credentials' });
  }
};

exports.confirm = async (req, res) => {
  const { token } = req.body;
  const user = await User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: undefined, confirmed: true },
    { new: true },
  );

  if (!user) {
    res.status(400).json({ error: 'Ooops. Invalid token or you have already confirmed' });
    return;
  }

  res.json(user.generateJWT());
};

exports.forgot = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(401).json({ error: 'No account with that email exists' });
    return;
  }

  user.resetPasswordToken = bcrypt.hashSync(process.env.SECRET, 10).replace(/\//g, '');
  user.resetPasswordExpires = Date.now() + 36000000;

  await user.save();

  await send({
    user,
    from: 'FrontView <front-view@herokuapp.com>',
    filename: 'password-reset',
    subject: 'Password Reset',
    resetURL: `${req.protocol}://${req.get('host')}/login/reset/${user.resetPasswordToken}`,
  });

  res.json({ emailed: 'You have been emailed a password reset link. Please, check your email.' });
};

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(401).json({ error: 'Password reset is invalid or expired' });
    return;
  }

  res.json({ success: true });
};

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body.passwordConfirmation) {
    next();
    return;
  }

  res.json({ error: 'Passwords do not match!' });
};

exports.update = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.json({ error: 'Password reset is invalid or expired' });
    return;
  }

  user.passwordDigest = bcrypt.hashSync(req.body.password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.json({ user });
};
