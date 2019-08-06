import express from 'express';
import authenticate from '../middlewares/authenticate';
import { catchErrors } from '../handlers/errors';

import * as authController from './auth';
import * as usersController from './users';
import * as questionsController from './questions';
import * as commentsController from './comments';
import * as qlistController from './qlists';
import * as candidatesController from './candidates';

const router = express.Router();

router.post('/users', usersController.createUser);
router.get('/users/:identifier', usersController.getUser);
router.put('/user/:username', usersController.updateUser);
router.delete('/user/:username', usersController.remove);

router.post('/auth', authController.auth);
router.post('/auth/confirmation', authController.confirm);
router.post('/auth/forgot', catchErrors(authController.forgot));
router.get('/auth/reset/:token', catchErrors(authController.reset));
router.post(
  '/auth/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update),
);

router.post(
  '/questions/add',
  authenticate,
  catchErrors(questionsController.add),
);
router.post(
  '/questions/addFromFile',
  authenticate,
  catchErrors(questionsController.addFromFile),
);
router.put(
  '/question/:id/edit',
  authenticate,
  catchErrors(questionsController.edit),
);
router.patch(
  '/question/:id/approve',
  authenticate,
  catchErrors(questionsController.approve),
);
router.patch(
  '/question/:id/edit',
  authenticate,
  catchErrors(questionsController.editField),
);
router.get('/question/interface', questionsController.getQuestionInterface);
router.get('/question/:id', catchErrors(questionsController.getQuestionById));
router.get(
  '/question/:slug/one',
  catchErrors(questionsController.getQuestionBySlug),
);
router.get('/questions', catchErrors(questionsController.getQuestions));
router.get('/questions/top', catchErrors(questionsController.getTopQuestions));
router.get(
  '/questions/author/:username',
  catchErrors(questionsController.getQuestionsByAuthor),
);
router.get(
  '/questions/page/:page',
  catchErrors(questionsController.getQuestions),
);
router.get(
  '/questions/:type',
  catchErrors(questionsController.getQuestionsByFilter),
);
router.get(
  '/questions/:type/:tag',
  catchErrors(questionsController.getQuestionsByFilter),
);
router.put('/question/:id/vote', catchErrors(questionsController.voteQuestion));
router.delete('/question/:id', questionsController.remove);

router.get(
  '/comments/:username',
  catchErrors(commentsController.getCommentsByAuthor),
);
router.post('/comments/add', authenticate, catchErrors(commentsController.add));
router.patch(
  '/comment/:id/approve',
  authenticate,
  catchErrors(commentsController.approve),
);

router.get('/qlists/:username', catchErrors(qlistController.getQLists));
router.get(
  '/qlists/:username/:slug',
  catchErrors(qlistController.getQListQuestions),
);
router.post('/qlist/add', authenticate, catchErrors(qlistController.addQlist));
router.post(
  '/qlist/add/question',
  authenticate,
  catchErrors(qlistController.addQuestion),
);
router.delete('/qlist/:_id', qlistController.remove);

router.get('/candidates/:_id', catchErrors(candidatesController.getCandidates));
router.post(
  '/candidates/add',
  authenticate,
  catchErrors(candidatesController.add),
);
router.post(
  '/candidate/:_id/feedback',
  catchErrors(candidatesController.provideFeedack),
);
router.get('/candidate/:_id', catchErrors(candidatesController.getCandidate));

router.get('/search', questionsController.searchQuestions);

module.exports = router;
