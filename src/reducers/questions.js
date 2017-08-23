import map from 'lodash/map';

import {
  ADD_QUESTIONS,
  QUESTION_ADD,
  QUESTION_EDIT,
  QUESTION_GET
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_QUESTIONS:
      return action.questions;

    case QUESTION_ADD:
      return [...state, action.question];

    case QUESTION_GET:
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

    case QUESTION_EDIT:
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

    default:
      return state;
  }
};
