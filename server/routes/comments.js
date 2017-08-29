import Comment from '../models/comment';

exports.add = async (req, res) => {
  const { userId, questionId, comment, topic } = req.body;
  const newComment = await Comment.create({
    author: userId,
    question: questionId,
    text: comment,
    topic
  });

  res.send(newComment);
};