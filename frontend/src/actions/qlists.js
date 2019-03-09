import api from '../api';

import { QLISTS_ADD, QLIST_ADD, QLIST_GET, QLIST_ADD_QUESTION, QLIST_REMOVE } from './types';

import { addQuestions } from './questions';

export const addQlists = qlists => ({
  type: QLISTS_ADD,
  qlists,
});

export const qlistAdded = qlist => ({
  type: QLIST_ADD,
  qlist,
});

export const qlistGot = qlist => ({
  type: QLIST_GET,
  qlist,
});

export const qlistQuestionAdded = qlist => ({
  type: QLIST_ADD_QUESTION,
  qlist,
});

export const qlistRemoved = qlist => ({
  type: QLIST_REMOVE,
  qlist,
});

export const qlistAdd = qlist => dispatch =>
  api.qlists.add(qlist).then(qlist => dispatch(qlistAdded(qlist)));

export const qlistAddQuestion = (qlist, question) => dispatch => () =>
  api.qlists.addQuestion(qlist, question).then(qlist => dispatch(qlistQuestionAdded(qlist)));

export const getQLists = username => dispatch =>
  api.qlists.getByAuthor(username).then(qlists => dispatch(addQlists(qlists)));

export const getQListQuestions = (username, slug) => dispatch =>
  api.qlists.getQListQuestions(username, slug).then(qlist => {
    dispatch(qlistGot(qlist));
    dispatch(addQuestions(qlist.questions));
  });

export const removeQList = _id => dispatch =>
  api.qlists.remove(_id).then(qlist => dispatch(qlistRemoved(qlist)));
