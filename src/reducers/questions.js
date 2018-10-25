import map from 'lodash/map';

import {
  QUESTIONS_ADD,
  QUESTION_ADD,
  QUESTION_EDIT,
  QUESTION_GET,
  QUESTION_REMOVE,
  VOTE_LIKE,
  VOTE_DISLIKE,
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case QUESTIONS_ADD:
      return action.questions;

    case QUESTION_ADD:
      return [...state, action.question];

    case QUESTION_GET: {
      const gotIndex = state.findIndex(question => question._id === action.question._id);

      if (gotIndex > -1) {
        return map(state, (question) => {
          if (question._id === action.question._id) {
            return action.question;
          }

          return question;
        });
      }

      return [action.question];
    }

    case QUESTION_EDIT:
    case VOTE_LIKE:
    case VOTE_DISLIKE: {
      const editIndex = state.findIndex(question => question._id === action.question._id);

      if (editIndex > -1) {
        return map(state, (question) => {
          if (question._id === action.question._id) {
            return action.question;
          }

          return question;
        });
      }

      return [action.question];
    }

    case QUESTION_REMOVE: {
      const removeIndex = state.findIndex(question => question._id === action.question._id);

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