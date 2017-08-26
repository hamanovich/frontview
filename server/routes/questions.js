import Question from '../models/question';
import User from '../models/user';

exports.getQuestions = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 2;
  const skip = (page * limit) - limit;
  const countPromise = Question.count();
  const questionsPromise = Question.find().skip(skip).limit(limit);
  const [questions, count] = await Promise.all([questionsPromise, countPromise]);
  const pages = Math.ceil(count / limit);

  if (!questions.length && skip) {
    res.status(500).json({ error: `You asked for page ${page}. But that doesn't exist. Maximum page is ${pages}` });
    return;
  }

  res.json({ questions, count, pages });
};

exports.getQuestionById = async (req, res) => {
  const question = await Question.findById({ _id: req.params.id })
    .exec((err) => {
      if (err) {
        res.status(500).json({ error: `Question with id='${req.params.id}' didn't find` });
      }
    });

  if (question) {
    res.json(question);
    return;
  }
};

exports.add = async (req, res) => {
  const { question, skill, level, practice, answer, answers, notes, userId, lastModified } = req.body;
  const newQuestion = await Question.create({ question, skill, level, practice, answer, answers, notes, author: userId, lastModified });
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { $push: { questions: newQuestion._id } },
    { safe: true, upsert: true, new: true }
  );

  if (newQuestion && user) {
    res.json(newQuestion);
    return;
  }

  res.status(500).json({ error: 'Author of this question didn\'t find in database. Please relogin and try again' });
};

exports.edit = async (req, res) => {
  const question = await Question.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }).exec();

  await question.save();

  if (question) {
    res.json(question);
    return;
  }

  res.status(500).json({ error: 'Question didn\'t update' });
};

exports.editField = async (req, res) => {
  const question = await Question.findById({ _id: req.params.id });
  if (!question) {
    res.json({ errors: { form: `Question by ${req.params.id} didn't find` } });
    return;
  }

  question.lastModified = req.body.lastModified;
  question[req.body.field] = req.body.value;

  await question.save();

  res.json(question);
};

exports.remove = async (req, res) => {
  const question = await Question.findByIdAndRemove({ _id: req.params.id });
  const user = await User.findByIdAndUpdate({ _id: question.author }, { $pull: { questions: question._id } });

  if (question && user) {
    res.json(question);
    return;
  }

  res.status(500).res({ error: 'Question didn\'t remove' });
};

exports.getQuestionsByFilter = async (req, res) => {
  const { type, tag } = req.params;
  const tagQuery = tag || { $exists: true };
  const typePromise = Question.getListByType(type);
  const questionsPromise = Question.find({ [type]: tagQuery });
  const [tags, questions] = await Promise.all([typePromise, questionsPromise]);

  res.json({ tags, questions });
};

exports.searchQuestions = async (req, res) => {
  const questions = await Question.find({
    $text: {
      $search: req.query.q
    }
  }, {
      score: { $meta: 'textScore' }
    })
    .sort({
      score: { $meta: 'textScore' }
    });

  res.json(questions);
};