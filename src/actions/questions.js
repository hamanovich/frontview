import axios from 'axios';

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
  dispatch => axios.get(`/api/questions/page/${page}`)
    .then((res) => {
      const { questions, count, pages } = res.data;
      dispatch(addQuestions(questions, count, pages));

      return { count, pages };
    });

export const getQuestionsByFilter = (filter, tag = '') =>
  dispatch => axios.get(`/api/questions/${filter}/${tag}`)
    .then((res) => {
      const { tags, questions } = res.data;
      dispatch(addQuestions(questions));

      return { tags, questions };
    });

export const getQuestionById = id =>
  dispatch => axios.get(`/api/question/${id}`)
    .then(
    res => dispatch(questionGot(res.data)),
    err => err.response);

export const getQuestionBySlug = slug =>
  dispatch => axios.get(`/api/question/${slug}/one`)
    .then(
    res => dispatch(questionGot(res.data)),
    err => err.response);

export const addQuestion = question =>
  dispatch => axios.post('/api/questions/add', question)
    .then(res => dispatch(questionAdded(res.data)));

export const editQuestion = data =>
  dispatch => axios.put(`/api/question/${data._id}/edit`, data)
    .then(res => dispatch(questionEdited(res.data)));

export const editQuestionField = (id, field, value) =>
  dispatch => axios.patch(`/api/question/${id}/edit`, { field, value, lastModified: new Date() })
    .then((res) => {
      dispatch(questionEdited(res.data));
      return res.data;
    });

export const removeQuestion = id =>
  dispatch => axios.delete(`/api/question/${id}`)
    .then(res => dispatch(questionRemoved(res.data)));

export const getSearchedQuestions = query =>
  dispatch => axios.get(`/api/search?q=${query}`)
    .then((res) => {
      if (res.data.length) {
        dispatch(addQuestions(res.data));
      }

      return res.data;
    });

export const voteQuestion = (question, action, userId) =>
  dispatch => axios.put(`/api/question/${question.id}/vote`, { question, action, userId })
    .then(res => action === 'like'
      ? dispatch(voteLike(res.data))
      : dispatch(voteDislike(res.data))
    );