import express from 'express';

const router = express.Router();

const authController = require('./auth');
const usersController = require('./users');

router.post('/users', usersController.createUser);
router.get('/users/:identifier', usersController.getUser);
// router.get('/users/id/:id', usersController.getUserById);
// router.put('/users/:id', usersController.updateUser);
// router.delete('/users/:id', usersController.deleteUser);

router.post('/auth', authController.authUser);
// router.post('/auth/forgot', authController.forgotUser);
// router.get('/auth/reset/:token', authController.getResetPassword);
// router.post('/auth/reset/:token', authController.postResetPassword);

module.exports = router;