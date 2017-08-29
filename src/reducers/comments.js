import { COMMENT_ADD } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case COMMENT_ADD:
      return [...state, action.comment];

    default:
      return state;
  }
};