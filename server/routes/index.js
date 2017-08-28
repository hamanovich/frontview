import express from 'express';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

const { catchErrors } = require('../handlers/errors');
const authController = require('./auth');
const usersController = require('./users');
const questionsController = require('./questions');

router.post('/users', usersController.createUser);
router.get('/users/:identifier', usersController.getUser);
router.put('/users/:username', usersController.updateUser);
router.delete('/users/:username', usersController.remove);

router.post('/auth', authController.auth);
router.post('/auth/forgot', catchErrors(authController.forgot));
router.get('/auth/reset/:token', catchErrors(authController.reset));
router.post('/auth/reset/:token', authController.confirmedPasswords, catchErrors(authController.update));

router.post('/questions/add', authenticate, questionsController.add);
router.put('/question/:id/edit', authenticate, catchErrors(questionsController.edit));
router.patch('/question/:id/edit', authenticate, catchErrors(questionsController.editField));
router.get('/question/:id', catchErrors(questionsController.getQuestionById));
router.get('/questions', catchErrors(questionsController.getQuestions));
router.get('/questions/page/:page', catchErrors(questionsController.getQuestions));
router.get('/questions/:type', catchErrors(questionsController.getQuestionsByFilter));
router.get('/questions/:type/:tag', catchErrors(questionsController.getQuestionsByFilter));
router.put('/question/:id/vote', catchErrors(questionsController.voteQuestion));
router.delete('/question/:id', questionsController.remove);

router.get('/search', questionsController.searchQuestions);

module.exports = router;