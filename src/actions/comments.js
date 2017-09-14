import { COMMENTS_ADD, COMMENT_ADD } from './types';

import api from '../api';

export const addComments = comments => ({
  type: COMMENTS_ADD,
  comments
});

export const commentAdded = comment => ({
  type: COMMENT_ADD,
  comment
});

export const addComment = comment =>
  dispatch => api.comments.add(comment).then(comment => dispatch(commentAdded(comment)));

export const getCommentsByAuthor = username =>
  dispatch => api.comments.getByAuthor(username).then(comments => dispatch(addComments(comments)));