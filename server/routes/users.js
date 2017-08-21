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
    res.json({ user });
    return;
  }

  res.json({ success: true });
};

// exports.getUserById = (req, res) => {
//   User.findOne({ _id: req.params.id })
//     .then(user => res.json({ user }))
//     .catch(error => res.status(500).json({ error }));
// };


// exports.updateUser = (req, res) => {
//   validateUser(req.body, validate).then(({ errors, isValid }) => {
//     if (isValid) {
//       const { username, email, password, first_name, last_name, primary_skill, job_function, notes } = req.body;
//       const password_digest = bcrypt.hashSync(password, 10);

//       User.findByIdAndUpdate(
//         { _id: req.params.id },
//         { $set: { username, email, first_name, last_name, job_function, primary_skill, notes, password_digest } })
//         .then(() => {
//           User.findOne({ _id: req.params.id }).then(user => res.json({ user }));
//         })
//         .catch(error => res.status(500).json({ error }));
//     } else {
//       res.status(400).json(errors);
//     }
//   });
// };

// exports.deleteUser = (req, res) => {
//   User.findByIdAndRemove({ _id: req.params.id })
//     .then(user => res.json({ user }))
//     .catch(error => res.status(500).json({ error }));
// };
