import express from 'express';
import authenticate from '../middlewares/authenticate';
import { catchErrors } from '../handlers/errors';

import * as authController from './auth';
import * as usersController from './users';
import * as questionsController from './questions';
import * as commentsController from './comments';
import * as qlistController from './qlists';

const router = express.Router();

router.post('/users', usersController.createUser);
router.get('/users/:identifier', usersController.getUser);
router.put('/users/:username', usersController.updateUser);
router.delete('/users/:username', usersController.remove);

router.post('/auth', authController.auth);
router.post('/auth/confirmation', authController.confirm);
router.post('/auth/forgot', catchErrors(authController.forgot));
router.get('/auth/reset/:token', catchErrors(authController.reset));
router.post('/auth/reset/:token', authController.confirmedPasswords, catchErrors(authController.update));

router.post('/questions/add', authenticate, catchErrors(questionsController.add));
router.put('/question/:id/edit', authenticate, catchErrors(questionsController.edit));
router.patch('/question/:id/edit', authenticate, catchErrors(questionsController.editField));
router.get('/question/interface', questionsController.getQuestionInterface);
router.get('/question/:id', catchErrors(questionsController.getQuestionById));
router.get('/question/:slug/one', catchErrors(questionsController.getQuestionBySlug));
router.get('/questions', catchErrors(questionsController.getQuestions));
router.get('/questions/top', catchErrors(questionsController.getTopQuestions));
router.get('/questions/author/:username', catchErrors(questionsController.getQuestionsByAuthor));
router.get('/questions/page/:page', catchErrors(questionsController.getQuestions));
router.get('/questions/:type', catchErrors(questionsController.getQuestionsByFilter));
router.get('/questions/:type/:tag', catchErrors(questionsController.getQuestionsByFilter));
router.put('/question/:id/vote', catchErrors(questionsController.voteQuestion));
router.delete('/question/:id', questionsController.remove);

router.get('/comments/:username', catchErrors(commentsController.getCommentsByAuthor));
router.post('/comments/add', authenticate, catchErrors(commentsController.add));

router.get('/qlists/:_id', catchErrors(qlistController.getQListsByAuthor));
router.post('/qlist/add', authenticate, catchErrors(qlistController.addQlist));
router.post('/qlist/add/question', authenticate, catchErrors(qlistController.addQuestion));

router.get('/search', questionsController.searchQuestions);

module.exports = router;