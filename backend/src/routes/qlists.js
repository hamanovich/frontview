import map from 'lodash/map';

import QList from '../models/qlist';
import User from '../models/user';

exports.addQlist = async (req, res) => {
  const { title, notes, userId } = req.body;
  const newQList = await QList.create({
    title,
    notes,
    author: userId,
  });

  res.send(newQList);
};

exports.addQuestion = async (req, res) => {
  const { qlist, question } = req.body;
  const operator = map(qlist.questions, q => q._id).includes(question._id) ? '$pull' : '$addToSet';
  const newQlist = await QList.findByIdAndUpdate(
    qlist._id,
    { [operator]: { questions: question._id } },
    { new: true },
  ).populate('questions');

  res.json(newQlist);
};

exports.getQLists = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    res.status(404).json({ error: "User didn't find" });
    return;
  }

  const qlists = await QList.find({ author: user._id });

  res.json(qlists);
};

exports.getQListQuestions = async (req, res) => {
  const { slug, username } = req.params;
  const qlist = await QList.findOne({ slug });
  const user = await User.findOne({ username });

  if (!qlist) {
    res.status(404).json({ error: `QList ${slug} didn't find` });
    return;
  }

  if (!user) {
    res.status(404).json({ error: `User ${username} didn't find` });
    return;
  }

  res.json(qlist);
};

exports.remove = async (req, res) => {
  const qlist = await QList.findByIdAndRemove(req.params._id);

  if (qlist) {
    res.json(qlist);
    return;
  }

  res.status(500).json({ error: "QList didn't remove" });
};
