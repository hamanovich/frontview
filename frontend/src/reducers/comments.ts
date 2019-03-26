import { Comment } from '../propTypes/CommentType';
import { COMMENTS_ADD, COMMENT_ADD } from '../actions/types';
import { CommentsActionTypes } from '../actions/comments';

const initialState: Comment[] = [];

export default (
  state = initialState,
  action: CommentsActionTypes,
): Comment[] => {
  switch (action.type) {
    case COMMENTS_ADD:
      return action.comments;

    case COMMENT_ADD:
      return [...state, action.comment];

    default:
      return state;
  }
};
