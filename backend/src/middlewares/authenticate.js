import jwt from 'jsonwebtoken';
import { forbidden } from '../handlers/errors';

import User from '../models/user';

export default (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let token;

  if (authorizationHeader) {
    // eslint-disable-next-line prefer-destructuring
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        User.findOne({ _id: decoded._id }).then(user => {
          if (!user) {
            res.status(404).json({ error: 'No such user' });
          } else {
            req.currentUser = user;
            next();
          }
        });
      }
    });
  } else {
    forbidden(req, res, next, 'No token provided');
  }
};
