import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import api from '../api';
import { addQuestions } from './questions';
import { AppState } from '../reducers';
import { QList } from '../propTypes/QListType';
import { Question } from '../propTypes/QuestionType';
import {
  QLISTS_ADD,
  QLIST_ADD,
  QLIST_GET,
  QLIST_ADD_QUESTION,
  QLIST_REMOVE,
} from './types';

interface addQlistsAction {
  type: typeof QLISTS_ADD;
  qlists: QList[];
}

interface qlistAddedAction {
  type: typeof QLIST_ADD;
  qlist: QList;
}

interface qlistGotAction {
  type: typeof QLIST_GET;
  qlist: QList;
}

interface qlistQuestionAddedAction {
  type: typeof QLIST_ADD_QUESTION;
  qlist: QList;
}

interface qlistRemovedAction {
  type: typeof QLIST_REMOVE;
  qlist: QList;
}

export const addQlists = (qlists: QList[]) => ({
  type: QLISTS_ADD,
  qlists,
});

export const qlistAdded = (qlist: QList) => ({
  type: QLIST_ADD,
  qlist,
});

export const qlistGot = (qlist: QList) => ({
  type: QLIST_GET,
  qlist,
});

export const qlistQuestionAdded = (qlist: QList) => ({
  type: QLIST_ADD_QUESTION,
  qlist,
});

export const qlistRemoved = (qlist: QList) => ({
  type: QLIST_REMOVE,
  qlist,
});

export const qlistAdd = (
  qlist: QList,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.qlists.add(qlist).then(qlist => dispatch(qlistAdded(qlist)));

export const qlistAddQuestion = (
  qlist: QList,
  question: Question,
): ThunkAction<void, AppState, null, Action<string>> => dispatch => () =>
  api.qlists
    .addQuestion(qlist, question)
    .then(qlist => dispatch(qlistQuestionAdded(qlist)));

export const getQLists = (
  username: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.qlists.getByAuthor(username).then(qlists => dispatch(addQlists(qlists)));

export const getQListQuestions = (
  username: string,
  slug: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.qlists.getQListQuestions(username, slug).then(qlist => {
    dispatch(qlistGot(qlist));
    dispatch(addQuestions(qlist.questions));
  });

export const removeQList = (
  _id: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.qlists.remove(_id).then(qlist => dispatch(qlistRemoved(qlist)));

export type QListActionTypes =
  | addQlistsAction
  | qlistAddedAction
  | qlistGotAction
  | qlistQuestionAddedAction
  | qlistRemovedAction;
