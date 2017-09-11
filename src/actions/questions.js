import api from '../api';

import {
  QUESTIONS_ADD,
  QUESTION_ADD,
  QUESTION_EDIT,
  QUESTION_GET,
  QUESTION_REMOVE,
  VOTE_LIKE,
  VOTE_DISLIKE
} from './types';

export const addQuestions = (questions, count = 0, pages = 0) => ({
  type: QUESTIONS_ADD,
  questions,
  count,
  pages
});

export const questionGot = question => ({
  type: QUESTION_GET,
  question
});

export const questionAdded = question => ({
  type: QUESTION_ADD,
  question
});

export const questionEdited = question => ({
  type: QUESTION_EDIT,
  question
});

export const questionRemoved = question => ({
  type: QUESTION_REMOVE,
  question
});

export const voteLike = question => ({
  type: VOTE_LIKE,
  question
});

export const voteDislike = question => ({
  type: VOTE_DISLIKE,
  question
});

export const getQuestions = (page = 1) =>
  dispatch => api.questions.getQuestions(page)
    .then(({ questions, count, pages }) => {
      dispatch(addQuestions(questions, count, pages));

      return { count, pages };
    });

export const getTopQuestions = () =>
  dispatch => api.questions.getTop()
    .then(questions => dispatch(addQuestions(questions)));

export const getQuestionsByFilter = (filter, tag = '') =>
  dispatch => api.questions.getByFilter(filter, tag)
    .then(({ tags, questions }) => {
      dispatch(addQuestions(questions));

      return { tags, questions };
    });

export const getQuestionById = id =>
  dispatch => api.questions.getById(id)
    .then(question => dispatch(questionGot(question)));

export const getQuestionBySlug = slug =>
  dispatch => api.questions.getBySlug(slug)
    .then(question => dispatch(questionGot(question)));

export const getQuestionsByAuthor = username =>
  dispatch => api.questions.getByAuthor(username)
    .then(questions => dispatch(addQuestions(questions)));

export const addQuestion = question =>
  dispatch => api.questions.add(question)
    .then(question => dispatch(questionAdded(question)));

export const editQuestion = data =>
  dispatch => api.questions.edit(data)
    .then(question => dispatch(questionEdited(question)));

export const editQuestionField = (id, field, value) =>
  dispatch => api.questions.editField(id, field, value)
    .then(question => dispatch(questionEdited(question)));

export const removeQuestion = id =>
  dispatch => api.questions.remove(id)
    .then(question => dispatch(questionRemoved(question)));

export const getSearchedQuestions = query =>
  dispatch => api.questions.getSearched(query)
    .then((questions) => {
      if (questions.length) {
        dispatch(addQuestions(questions));
      }

      return questions;
    });

export const voteQuestion = (question, action, userId) =>
  dispatch => () => api.questions.vote(question, action, userId)
    .then(question => action === 'like'
      ? dispatch(voteLike(question))
      : dispatch(voteDislike(question))
    );