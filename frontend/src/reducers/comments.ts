import { Comment } from '../propTypes/CommentType';
import {
  COMMENTS_ADD,
  COMMENT_ADD,
  COMMENT_APPROVE,
  COMMENT_REMOVE,
} from '../actions/types';
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

    case COMMENT_APPROVE:
      const editIndex = state.findIndex(
        comment => comment._id === action.comment._id,
      );

      if (editIndex > -1) {
        return state.filter(
          (comment: Comment) => comment._id !== action.comment._id,
        );
      }

      return [action.comment];

    case COMMENT_REMOVE:
      const removeIndex = state.findIndex(
        comment => comment._id === action.comment._id,
      );

      if (removeIndex > -1) {
        return [
          ...state.slice(0, removeIndex),
          ...state.slice(removeIndex + 1),
        ];
      }

      return state;

    default:
      return state;
  }
};
