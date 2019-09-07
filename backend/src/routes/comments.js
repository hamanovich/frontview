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
    res.status(404).json({ error: `User @${username} wasn't found` });
    return;
  }

  const comments = await Comment.find({ author: user._id })
    .sort({ created: -1 })
    .populate({ path: 'question', select: '-author' });

  res.json(comments);
};

exports.getNotVerifiedComments = async (_, res) => {
  const comments = await Comment.find({
    $or: [{ isVerified: { $exists: false } }, { isVerified: false }],
  }).populate({
    path: 'question',
    select: '-author',
  });

  res.json(comments);
};

exports.approve = async (req, res) => {
  const comment = await Comment.findById(req.params.id)
    .populate('question')
    .populate({
      path: 'author',
      select: 'username email',
    });

  if (!comment) {
    res.json({ errors: { form: `Comment by ${req.params.id} wasn't found` } });
    return;
  }

  comment.lastModified = new Date();
  comment.isVerified = true;

  await comment.save();

  res.json(comment);
};

exports.remove = async (req, res) => {
  const comment = await Comment.findByIdAndRemove(req.params.id);
  const user = await User.findByIdAndUpdate(comment.author, {
    $pull: {
      comments: comment._id,
    },
  });

  await Comment.deleteOne({ comment: req.params.id });

  if (comment && user) {
    res.json(comment);
    return;
  }

  res.status(500).json({ error: "Comment wasn't removed" });
};
