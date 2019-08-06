import Comment from '../models/comment';
import User from '../models/user';

exports.add = async (req, res) => {
  const { userId, questionId, comment, topic } = req.body;
  const newComment = await Comment.create({
    author: userId,
    question: questionId,
    text: comment,
    topic,
  });

  res.send(newComment);
};

exports.getCommentsByAuthor = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (!user) {
    res.status(404).json({ error: `User @${username} didn't find` });
    return;
  }

  const comments = await Comment.find({ author: user._id })
    .sort({ created: -1 })
    .populate({ path: 'question', select: '-author' });

  res.json(comments);
};

exports.approve = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.json({ errors: { form: `Comment by ${req.params.id} didn't find` } });
    return;
  }

  comment.lastModified = new Date();
  comment.isVerified = true;

  await comment.save();

  res.json(comment);
};
