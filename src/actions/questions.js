import axios from 'axios';

import {
  QUESTIONS_ADD,
  QUESTION_ADD,
  QUESTION_EDIT,
  QUESTION_GET,
  QUESTION_REMOVE
} from './types';

export const addQuestions = (questions, count, pages) => ({
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

export const getQuestions = (page = 1) =>
  dispatch => axios.get(`/api/questions/page/${page}`)
    .then((res) => {
      const { questions, count, pages } = res.data;
      dispatch(addQuestions(questions, count, pages));

      return { questions, count, pages };
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
    res => dispatch(questionGot(res.data.question)),
    err => err.response
    );

export const addQuestion = question =>
  dispatch => axios.post('/api/questions/add', question)
    .then(res => dispatch(questionAdded(res.data.question)));

export const editQuestion = data =>
  dispatch => axios.put(`/api/question/${data._id}/edit`, data)
    .then(res => dispatch(questionEdited(res.data.question)));

export const editQuestionField = (id, field, value, lastModified) =>
  dispatch => axios.patch(`/api/question/${id}/edit`, { field, value, lastModified: new Date() })
    .then((res) => {
      dispatch(questionEdited(res.data.question));
      return res.data.question;
    });

export const removeQuestion = id =>
  dispatch => axios.delete(`/api/question/${id}`)
    .then(res => dispatch(questionRemoved(res.data.question)));
