import { COMMENTS_ADD, COMMENT_ADD } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case COMMENTS_ADD:
      return action.comments;

    case COMMENT_ADD:
      return [...state, action.comment];

    default:
      return state;
  }
};
