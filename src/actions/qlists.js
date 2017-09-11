import axios from 'axios';

import { QLISTS_ADD, QLIST_ADD, QLIST_ADD_QUESTION } from './types';

export const addQlists = qlists => ({
  type: QLISTS_ADD,
  qlists
});

export const qlistAdded = qlist => ({
  type: QLIST_ADD,
  qlist
});

export const qlistQuestionAdded = qlist => ({
  type: QLIST_ADD_QUESTION,
  qlist
});

export const qlistAdd = qlist =>
  dispatch => axios.post('/api/qlist/add', qlist)
    .then(res => dispatch(qlistAdded(res.data)));

export const qlistAddQuestion = (qlist, question) =>
  dispatch => axios.post('/api/qlist/add/question', { qlist, question })
    .then(res => dispatch(qlistQuestionAdded(res.data)));

export const getQListsByAuthor = _id =>
  dispatch => axios.get(`/api/qlists/${_id}`)
    .then(res => dispatch(addQlists(res.data)));