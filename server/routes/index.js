import express from 'express';

const router = express.Router();

const { catchErrors } = require('../handlers/errors');
const authController = require('./auth');
const usersController = require('./users');

router.post('/users', usersController.createUser);
router.get('/users/:identifier', usersController.getUser);
router.put('/users/:username', usersController.updateUser);
router.delete('/users/:username', usersController.remove);

router.post('/auth', authController.auth);
router.post('/auth/forgot', catchErrors(authController.forgot));
router.get('/auth/reset/:token', catchErrors(authController.reset));
router.post('/auth/reset/:token', authController.confirmedPasswords, catchErrors(authController.update));

module.exports = router;