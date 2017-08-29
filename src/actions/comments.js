import axios from 'axios';

import { COMMENT_ADD } from './types';

export const commentAdded = comment => ({
  type: COMMENT_ADD,
  comment
});

export const addComment = comment =>
  dispatch => axios.post('/api/comments/add', comment)
    .then(res => dispatch(commentAdded(res.data)));