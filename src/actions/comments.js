import axios from 'axios';

import { COMMENTS_ADD, COMMENT_ADD } from './types';

export const addComments = comments => ({
  type: COMMENTS_ADD,
  comments
});

export const commentAdded = comment => ({
  type: COMMENT_ADD,
  comment
});

export const addComment = comment =>
  dispatch => axios.post('/api/comments/add', comment)
    .then(res => dispatch(commentAdded(res.data)));

export const getCommentsByAuthor = username =>
    dispatch => axios.get(`/api/comments/${username}`)
      .then(res => dispatch(addComments(res.data)));