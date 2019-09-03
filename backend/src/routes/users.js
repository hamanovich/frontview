import bcrypt from 'bcrypt';

import User from '../models/user';
import send from '../handlers/mail';

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const passwordDigest = bcrypt.hashSync(password, 10);
  const host =
    process.env.NODE_ENV === 'production'
      ? req.get('host')
      : req.headers['x-forwarded-host'];

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
  const updatedUser = await User.findOneAndUpdate(
    { username: req.body.username },
    { ...req.body },
    { new: true },
  );

  try {
    await updatedUser.save();
  } catch (error) {
    res.json({ success: false });
    return;
  }

  res.json({ success: true, ...updatedUser._doc });
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
  try {
    await User.remove({ username: req.params.username });
  } catch (error) {
    res.json({ succes: false });
    return;
  }

  res.json({ succes: true, username: req.params.username });
};
