import {
  QUESTIONS_ADD,
  QUESTION_ADD,
  QUESTIONS_FROM_FILE_ADD,
  QUESTION_APPROVE,
  QUESTION_EDIT,
  QUESTION_GET,
  QUESTION_REMOVE,
  VOTE_LIKE,
  VOTE_DISLIKE,
} from '../actions/types';
import { Question } from '../propTypes/QuestionType';
import { QuestionsActionTypes } from '../actions/questions';

const initialState: Question[] = [];

export default (
  state = initialState,
  action: QuestionsActionTypes,
): Question[] => {
  switch (action.type) {
    case QUESTIONS_ADD:
      return action.questions;

    case QUESTION_ADD:
      return [...state, action.question];

    case QUESTIONS_FROM_FILE_ADD:
      return [...state, ...action.questions];

    case QUESTION_GET: {
      const gotIndex = state.findIndex(
        question => question._id === action.question._id,
      );

      if (gotIndex > -1) {
        return state.map((question: Question) => {
          if (question._id === action.question._id) {
            return action.question;
          }

          return question;
        });
      }

      return [action.question];
    }

    case QUESTION_APPROVE:
    case QUESTION_EDIT:
    case VOTE_LIKE:
    case VOTE_DISLIKE: {
      const editIndex = state.findIndex(
        question => question._id === action.question._id,
      );

      if (editIndex > -1) {
        return state.map((question: Question) => {
          if (question._id === action.question._id) {
            return action.question;
          }

          return question;
        });
      }

      return [action.question];
    }

    case QUESTION_REMOVE: {
      const removeIndex = state.findIndex(
        question => question._id === action.question._id,
      );

      if (removeIndex > -1) {
        return [
          ...state.slice(0, removeIndex),
          ...state.slice(removeIndex + 1),
        ];
      }

      return state;
    }

    default:
      return state;
  }
};
