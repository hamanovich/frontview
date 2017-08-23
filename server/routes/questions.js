import Question from '../models/question';
import User from '../models/user';

// exports.getQuestions = (req, res) => {
//   const page = req.params.page || 1;
//   const limit = 2;
//   const skip = (page * limit) - limit;
//   const countPrimise = Question.count();
//   const questionsPromise = Question
//     .find()
//     .skip(skip)
//     .limit(limit);

//   Promise.all([questionsPromise, countPrimise]).then((result) => {
//     const [ans, count] = result;
//     const pages = Math.ceil(count / limit);

//     if (!ans.length && skip) {
//       res.status(500).json({ error: `You asked for page ${page}. But that doesn't exist. Maximum page is ${pages}` });
//     }

//     res.json({ ans, count, pages });
//   }).catch(error => res.status(500).json({ error }));
// };

exports.getQuestionById = async (req, res) => {
  const question = await Question.findOne({ _id: req.params.id });

  if (question) {
    res.json({ question });
    return;
  }

  res.status(500).json({ error: `Question with id='${req.params.id}' didn't find` });
};

exports.add = async (req, res) => {
  const { question, skill, level, practice, answer, answers, notes, userId, lastModified } = req.body;
  const newQuestion = await Question.create({ question, skill, level, practice, answer, answers, notes, author: userId, lastModified });
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { $push: { questions: newQuestion._id } },
    { safe: true, upsert: true, new: true }
  );

  if (user) {
    res.json({ success: true });
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
    res.json({ question });
    return;
  }

  res.status(500).json({ error: 'Question didn\'t update' });
};

// exports.updateQuestionField = (req, res) => {
//   Question.findByIdAndUpdate({ _id: req.params.id }, { $set: { [req.body.field]: req.body.value, lastModified: req.body.lastModified } })
//     .then(() => Question.findOne({ _id: req.params.id })
//       .then(que => res.json({ que }))
//       .catch(error => res.status(500).json({ error })));
// };

// exports.voteQuestion = (req, res) => {
//   Question.findByIdAndUpdate({ _id: req.params.id }, { $push: { [req.body.field]: req.body.value } })
//     .then(() => Question.findOne({ _id: req.params.id })
//       .then((que) => {
//         User.findByIdAndUpdate({ _id: req.body.value }, { $push: { [req.body.field]: que._id } })
//           .then(() => res.json({ que }))
//           .catch(err => res.status(500).json({ error: err }));
//       }))
//     .catch(error => res.status(500).json({ error }));
// };

// exports.deleteQuestion = (req, res) => {
//   Question.findByIdAndRemove({ _id: req.params.id })
//     .then((ans) => {
//       User.findByIdAndUpdate({ _id: ans.author }, { $pull: { questions: ans._id } })
//         .then(() => res.json({ ans }))
//         .catch(error => res.status(500).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
// };

// exports.getQuestionsBySkills = (req, res) => {
//   const skills = req.params.tag;
//   const skillQuery = skills || { $exists: true };

//   const skillsPromise = Question.getSkillList();
//   const questionsPromise = Question.find({ skill: skillQuery });

//   Promise.all([skillsPromise, questionsPromise]).then((result) => {
//     const [skills, questions] = result;
//     res.json({ skills, questions });
//   }).catch(error => res.status(500).json({ error }));
// };
