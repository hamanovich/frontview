import map from 'lodash/map';

import { CANDIDATES_ADD, CANDIDATE_GET, CANDIDATE_ADD, CANDIDATE_REMOVE } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case CANDIDATES_ADD:
      return action.candidates;

    case CANDIDATE_ADD:
      return [...state, action.candidate];

    case CANDIDATE_GET:
      const gotIndex = state.findIndex(candidate => candidate._id === action.candidate._id);

      if (gotIndex > -1) {
        return map(state, (candidate) => {
          if (candidate._id === action.candidate._id) {
            return action.candidate;
          }

          return candidate;
        });
      }

      return [action.candidate];

    case CANDIDATE_REMOVE:
      const removeIndex = state.findIndex(candidate => candidate._id === action.candidate._id);

      if (removeIndex > -1) {
        return [
          ...state.slice(0, removeIndex),
          ...state.slice(removeIndex + 1)
        ];
      }

      return state;

    default:
      return state;
  }
};