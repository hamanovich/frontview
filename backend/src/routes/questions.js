import cloudinary from 'cloudinary';

import Question from '../models/question';
import User from '../models/user';
import Comment from '../models/comment';

import { forEachPromise } from '../handlers/utils';

cloudinary.config({
  cloud_name: 'hg7gzmcqk',
  api_key: '261148644829827',
  api_secret: 'dfgmvvZ2WYHd8vZeUkCKAvDbzGw',
});

exports.getQuestionInterface = (req, res) => {
  const { schema } = Question;
  const skill = schema.path('skill').caster.enumValues;
  const level = schema.path('level').caster.enumValues;
  const practice = schema.path('practice').enumValues;

  res.json({ skill, level, practice });
};

exports.getQuestions = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 5;
  const skip = page * limit - limit;
  const countPromise = Question.countDocuments();
  const questionsPromise = Question.find()
    .skip(skip)
    .limit(limit);
  const [questions, count] = await Promise.all([questionsPromise, countPromise]);
  const pages = Math.ceil(count / limit);

  if (!questions.length && skip) {
    res.status(500).json({
      error: `You asked for page ${page}. But that doesn't exist. Maximum page is ${pages}`,
    });
    return;
  }

  res.json({ questions, count, pages });
};

exports.getQuestionById = async (req, res) => {
  const question = await Question.findById(req.params.id, err => {
    if (err) {
      res.status(500).json({ error: `Question with id='${req.params.id}' didn't find` });
    }
  });

  if (question) {
    res.json(question);
  }
};

exports.getQuestionBySlug = async (req, res) => {
  const question = await Question.findOne({ slug: req.params.slug });

  if (question) {
    res.json(question);
    return;
  }

  res.status(500).json({ error: `Question with slug='${req.params.slug}' didn't find` });
};

exports.add = async (req, res) => {
  const {
    question,
    skill,
    level,
    practice,
    answer,
    answers,
    notes,
    imgs,
    userId,
    lastModified,
  } = req.body;
  const imgsList = [];

  function logItem(item) {
    return new Promise(resolve => {
      process.nextTick(() => {
        cloudinary.uploader.upload(
          item,
          result => {
            imgsList.push(result.url);
            resolve();
          },
          {
            folder: 'frontview',
          },
        );
      });
    });
  }

  await forEachPromise(imgs, logItem);

  const newQuestion = await Question.create({
    question,
    skill,
    level,
    practice,
    answer,
    answers,
    notes,
    imgs: imgsList,
    author: userId,
    lastModified,
  });

  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { questions: newQuestion._id } },
    { safe: true, upsert: true, new: true },
  );

  if (newQuestion && user) {
    res.json(newQuestion);
    return;
  }

  res.status(500).json({
    error: "Author of this question didn't find in database. Please relogin and try again",
  });
};

exports.addFromFile = async (req, res) => {
  const { questions } = req.body;

  if (
    typeof questions === 'undefined' ||
    questions.length === 0 ||
    Object.prototype.toString.call(questions).slice(8, -1) !== 'Array'
  ) {
    res.status(500).json({
      error: 'This JSON has invalid format',
    });

    return;
  }

  const createQuestionAndUser = async singleQuestion => {
    const { question, skill, level, practice, answer, answers, notes } = singleQuestion;
    const { userId, lastModified } = req.body;

    const newQuestion = await Question.create({
      question,
      skill,
      level,
      practice,
      answer,
      answers,
      notes,
      author: userId,
      lastModified,
    });

    const newUser = await User.findByIdAndUpdate(
      userId,
      { $push: { questions: newQuestion._id } },
      { safe: true, upsert: true, new: true },
    );

    return { newQuestion, newUser };
  };

  const mapQuestions = req.body.questions.map(createQuestionAndUser);

  const addAll = await Promise.all(mapQuestions);
  const newQuestions = addAll.map(item => item.newQuestion);

  if (addAll) {
    res.json(newQuestions);
    return;
  }

  res.status(500).json({
    error: "Author of this question didn't find in database. Please relogin and try again",
  });
};

exports.edit = async (req, res) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();

  await question.save();

  if (question) {
    res.json(question);
    return;
  }

  res.status(500).json({ error: "Question didn't update" });
};

exports.approve = async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    res.json({ errors: { form: `Question by ${req.params.id} didn't find` } });
    return;
  }

  question.lastModified = new Date();
  question.isVerified = true;

  await question.save();

  res.json(question);
};

exports.editField = async (req, res) => {
  const question = await Question.findById(req.params.id);
  const [field, index] = req.body.field.split('.');

  if (!question) {
    res.json({ errors: { form: `Question by ${req.params.id} didn't find` } });
    return;
  }

  if (index) {
    question[field].set(index, { text: req.body.value });
  } else {
    question[field] = req.body.value;
  }

  question.lastModified = new Date();
  question.isVerified = false;

  await question.save();

  res.json(question);
};

exports.remove = async (req, res) => {
  const question = await Question.findByIdAndRemove(req.params.id);
  const user = await User.findByIdAndUpdate(question.author, {
    $pull: {
      questions: question._id,
      'votes.like': question._id,
      'votes.dislike': question._id,
    },
  });

  await Comment.remove({ question: req.params.id });

  if (question && user) {
    res.json(question);
    return;
  }

  res.status(500).json({ error: "Question didn't remove" });
};

exports.getQuestionsByFilter = async (req, res) => {
  const { type, tag } = req.params;
  const tagQuery = tag || { $exists: true };
  const typePromise = Question.getListByType(type);
  const questionsPromise = Question.find({ [type]: tagQuery });
  const [tags, questions] = await Promise.all([typePromise, questionsPromise]);

  res.json({ tags, questions });
};

exports.getQuestionsByAuthor = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (!user) {
    res.status(404).json({ error: "User didn't find" });
    return;
  }

  const questions = await Question.find({ author: user._id });

  res.json(questions);
};

exports.searchQuestions = async (req, res) => {
  const questions = await Question.find(
    {
      $text: {
        $search: req.query.q,
      },
    },
    {
      score: { $meta: 'textScore' },
    },
  ).sort({
    score: { $meta: 'textScore' },
  });

  res.json(questions);
};

exports.voteQuestion = async (req, res) => {
  const { action, question, userId } = req.body;
  const votes = question.votes[action].map(obj => obj.toString());
  const operator = votes.includes(userId) ? '$pull' : '$addToSet';
  const newQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    { [operator]: { [`votes.${action}`]: userId } },
    { new: true },
  ).populate('author comments');
  const user = await User.findByIdAndUpdate(
    userId,
    { [operator]: { [`votes.${action}`]: question._id } },
    { new: true },
  ).populate('questions');

  if (user && newQuestion) {
    res.json(newQuestion);
    return;
  }

  res.status(500).json({ error: 'You can not vote!' });
};

exports.getTopQuestions = async (req, res) => {
  const questions = await Question.getTopQuestions();

  res.send(questions);
};
