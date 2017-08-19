import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { send } from '../handlers/mail';

exports.authUser = (req, res) => {
  const { identifier, password } = req.body;

  User.findOne({ $or: [{ username: identifier }, { email: identifier }] })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password_digest)) {
        const userData = {
          _id: user._id,
          username: user.username,
          email: user.email
        };
        const token = jwt.sign(userData, process.env.SECRET);

        res.json({ ...userData, token });
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    });
};

exports.forgotUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ errors: { form: 'No account with that email exists' } });
        return;
      }

      user.resetPasswordToken = bcrypt.hashSync(process.env.SECRET, 10).replace(/\//g, '');
      user.resetPasswordExpires = Date.now() + 3600000;

      user.save();

      const resetURL = `http://${req.headers.host}/reset/${user.resetPasswordToken}`;

      send({
        user,
        filename: 'password-reset',
        subject: 'Password Reset',
        resetURL
      }).then(() => res.json({ emailed: 'You have been emailed a password reset link. Please, check your email.' }))
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getResetPassword = (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  }).then((user) => {
    if (!user) {
      res.status(401).json({ errors: { reset: 'Password reset is invalid or expired' } });
    }
  })
    .catch(error => res.status(500).json({ error }));
};

exports.postResetPassword = (req, res) => {
  if (req.body.password === req.body.passwordConfirmation) {
    User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    }).then((user) => {
      if (!user) {
        res.json({ errors: { reset: 'Password reset is invalid or expired' } });
        res.redirect('/login');
      }

      user.password_digest = bcrypt.hashSync(req.body.password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      user.save();
      res.json({ user });
    })
      .catch(error => res.status(500).json({ error }));
  } else {
    res.status(401).json({ errors: { reset: 'Passwords do not match!' } });
  }
};
