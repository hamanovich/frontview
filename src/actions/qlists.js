import api from '../api';

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
  dispatch => api.qlists.add(qlist).then(qlist => dispatch(qlistAdded(qlist)));

export const qlistAddQuestion = (qlist, question) =>
  dispatch => api.qlists.addQuestion(qlist, question).then(qlist => dispatch(qlistQuestionAdded(qlist)));

export const getQListsByAuthor = _id =>
  dispatch => api.qlists.getByAuthor(_id).then(qlist => dispatch(addQlists(qlist)));