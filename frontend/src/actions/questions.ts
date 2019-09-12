import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import api from '../api';
import { AppState } from '../reducers';
import { Question } from '../propTypes/QuestionType';
import {
  QUESTIONS_ADD,
  QUESTIONS_FROM_FILE_ADD,
  QUESTION_ADD,
  QUESTION_APPROVE,
  QUESTION_EDIT,
  QUESTION_GET,
  QUESTION_REMOVE,
  VOTE_LIKE,
  VOTE_DISLIKE,
} from './types';

interface AddQuestionsAction {
  type: typeof QUESTIONS_ADD;
  questions: Question[];
  count: number;
  pages: number;
}

interface QuestionGotAction {
  type: typeof QUESTION_GET;
  question: Question;
}

interface QuestionAddedAction {
  type: typeof QUESTION_ADD;
  question: Question;
}

interface QuestionsFromFileAddedAction {
  type: typeof QUESTIONS_FROM_FILE_ADD;
  questions: Question[];
}

interface QuestionApprovedAction {
  type: typeof QUESTION_APPROVE;
  question: Question;
}

interface QuestionEditedAction {
  type: typeof QUESTION_EDIT;
  question: Question;
}

interface QuestionRemovedAction {
  type: typeof QUESTION_REMOVE;
  question: Question;
}

interface VoteLikeAction {
  type: typeof VOTE_LIKE;
  question: Question;
}

interface VoteDislikeAction {
  type: typeof VOTE_DISLIKE;
  question: Question;
}

export const addQuestions = (questions: Question[], count = 0, pages = 0) => ({
  type: QUESTIONS_ADD,
  questions,
  count,
  pages,
});

export const questionGot = (question: Question) => ({
  type: QUESTION_GET,
  question,
});

export const questionAdded = (question: Question) => ({
  type: QUESTION_ADD,
  question,
});

export const questionsFromFileAdded = (questions: Question[]) => ({
  type: QUESTIONS_FROM_FILE_ADD,
  questions,
});

export const questionApproved = (question: Question) => ({
  type: QUESTION_APPROVE,
  question,
});

export const questionEdited = (question: Question) => ({
  type: QUESTION_EDIT,
  question,
});

export const questionRemoved = (question: Question) => ({
  type: QUESTION_REMOVE,
  question,
});

export const voteLike = (question: Question) => ({
  type: VOTE_LIKE,
  question,
});

export const voteDislike = (question: Question) => ({
  type: VOTE_DISLIKE,
  question,
});

export const getQuestionInterface = () => () => api.questions.getInterface();

export const getQuestions = (
  page = 1,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.questions.getQuestions(page).then(({ questions, count, pages }) => {
    dispatch(addQuestions(questions, count, pages));

    return { count, pages };
  });

export const getTopQuestions = (): ThunkAction<
  void,
  AppState,
  null,
  Action<string>
> => dispatch =>
  api.questions.getTop().then(questions => dispatch(addQuestions(questions)));

export const getNotVerifiedQuestions = (): ThunkAction<
  void,
  AppState,
  null,
  Action<string>
> => dispatch =>
  api.questions
    .getNotVerified()
    .then(questions => dispatch(addQuestions(questions)));

export const getQuestionsByFilter = (
  filter: string,
  tag = '',
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.questions.getByFilter(filter, tag).then(({ tags, questions }) => {
    dispatch(addQuestions(questions));

    return { tags, questions };
  });

export const getQuestionsByQList = (
  qlist: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.questions
    .getByQList(qlist)
    .then(questions => dispatch(addQuestions(questions)));

export const getQuestionById = (
  id: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.questions.getById(id).then(question => dispatch(questionGot(question)));

export const getQuestionBySlug = (
  slug: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.questions
    .getBySlug(slug)
    .then(question => dispatch(questionGot(question)));

export const getQuestionsByAuthor = (
  username: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.questions
    .getByAuthor(username)
    .then(questions => dispatch(addQuestions(questions)));

export const addQuestion = (
  question: Question,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.questions
    .add(question)
    .then(question => dispatch(questionAdded(question)));

export const addQuestionsFromFile = (
  questions: Question[],
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.questions
    .addFromFile(questions)
    .then(questions => dispatch(questionsFromFileAdded(questions)));

export const approveQuestion = (
  id: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.questions
    .approve(id)
    .then(question => dispatch(questionApproved(question)));

export const editQuestion = (
  data: any,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.questions.edit(data).then(question => dispatch(questionEdited(question)));

export const editQuestionField = (
  id: string,
  field: string,
  value: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.questions.editField(id, field, value).then(question => {
    dispatch(questionEdited(question));

    return question;
  });

export const removeQuestion = (
  id: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.questions
    .remove(id)
    .then(question => dispatch(questionRemoved(question)));

export const getSearchedQuestions = (
  query: string,
): ThunkAction<Promise<any>, AppState, null, Action<string>> => dispatch =>
  api.questions.getSearched(query).then(questions => {
    if (questions.length) {
      dispatch(addQuestions(questions));
    }

    return questions;
  });

export const voteQuestion = (
  question: Question,
  action: string,
  userId: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch => () =>
  api.questions
    .vote(question, action, userId)
    .then(question =>
      action === 'like'
        ? dispatch(voteLike(question))
        : dispatch(voteDislike(question)),
    );

export type QuestionsActionTypes =
  | AddQuestionsAction
  | QuestionGotAction
  | QuestionAddedAction
  | QuestionsFromFileAddedAction
  | QuestionApprovedAction
  | QuestionEditedAction
  | QuestionRemovedAction
  | VoteLikeAction
  | VoteDislikeAction;
