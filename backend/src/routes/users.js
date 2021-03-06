import bcrypt from 'bcrypt';

import User from '../models/user';
import send from '../handlers/mail';
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
    isValid: !errors || Object.keys(errors).length === 0,
  };
};

exports.createUser = async (req, res) => {
  const { errors, isValid } = await validateUser(req.body, validate);
  const { username, email, password } = req.body;
  const passwordDigest = bcrypt.hashSync(password, 10);
  const host =
    process.env.NODE_ENV === 'production'
      ? req.get('host')
      : req.headers['x-forwarded-host'];

  if (!isValid) {
    res.status(409).json(errors);
  }

  const user = new User({
    username,
    email,
    passwordDigest,
    confirmationToken: bcrypt
      .hashSync(process.env.SECRET, 10)
      .replace(/\//g, ''),
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

  await send({
    user,
    from: 'Frontview <frontview@herokuapp.com>',
    filename: 'confirmation-email',
    subject: 'Confirmation Email',
    confirmURL: `${req.protocol}://${host}/confirmation/${user.confirmationToken}`,
  });

  res.send(user);
};

exports.getAllUsers = async (req, res) => {
  const privateFields = { confirmationToken: 0, passwordDigest: 0 };
  const users = await User.find({}, privateFields).sort({ role: 1 });

  if (users) {
    res.json(users);
    return;
  }

  res.json({ error: 'No users registered' });
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    $or: [
      { username: req.params.identifier },
      { email: req.params.identifier },
    ],
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
    };

    res.json(userData);
    return;
  }

  res.json({ error: "User wasn't found" });
};

exports.updateUser = async (req, res) => {
  const { errors, isValid } = await validateUser(req.body, validate);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const userOne = await User.findOneAndUpdate(
    { username: req.params.username },
    { ...req.body },
    { new: true },
  );

  await userOne.save();

  res.json({ success: true, username: req.params.username });
};

exports.updateUserRole = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { username: req.params.username },
    { role: req.body.role },
    { new: true },
  );

  if (!user) {
    res.json({
      errors: { form: `User by ${req.params.usernbame} wasn't found` },
    });
    return;
  }

  res.json({
    success: true,
    username: req.params.username,
    role: req.body.role,
  });
};

exports.remove = async (req, res) => {
  await User.deleteOne({ username: req.params.username });

  res.json({ succes: true, username: req.params.username });
};
