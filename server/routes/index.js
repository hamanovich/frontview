import express from 'express';

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

router.post('/questions/add', questionsController.add);
router.put('/question/:id/edit', catchErrors(questionsController.edit));
router.get('/question/:id', catchErrors(questionsController.getQuestionById));
// router.get('/question/:slug', catchErrors(questionsController.getQuestionBySlug));

module.exports = router;