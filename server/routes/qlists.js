import QList from '../models/qlist';
import User from '../models/user';

exports.addQlist = async (req, res) => {
  const { title, notes, userId } = req.body;
  const newQList = await QList.create({
    title,
    notes,
    author: userId
  });

  res.send(newQList);
};

exports.addQuestion = async (req, res) => {
  const { qlist, question } = req.body;
  const operator = qlist.questions.includes(question._id) ? '$pull' : '$addToSet';
  const newQlist = await QList.findByIdAndUpdate(qlist._id,
    { [operator]: { questions: question._id } },
    { new: true }
  );

  res.json(newQlist);
};

exports.getQLists = async (req, res) => {
  const { _id } = req.params;
  const user = await User.findById({ _id });

  if (!user) {
    res.status(404).json({ error: `User ${username} didn't find` });
    return;
  }

  const qlists = await QList.find({ author: user._id }).sort({ created: -1 });

  res.json(qlists);
};


exports.remove = async (req, res) => {
  const qlist = await QList.findByIdAndRemove({ _id: req.params._id });

  if (qlist) {
    res.json(qlist);
    return;
  }

  res.status(500).json({ error: 'QList didn\'t remove' });
};