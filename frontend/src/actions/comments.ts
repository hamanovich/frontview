import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import api from '../api';
import { AppState } from '../reducers';
import { Comment } from '../propTypes/CommentType';
import { COMMENTS_ADD, COMMENT_ADD } from './types';

interface addCommentsAction {
  type: typeof COMMENTS_ADD;
  comments: Comment[];
}

interface commentAddedAction {
  type: typeof COMMENT_ADD;
  comment: Comment;
}

export const addComments = (comments: Comment[]) => ({
  type: COMMENTS_ADD,
  comments,
});

export const commentAdded = (comment: Comment) => ({
  type: COMMENT_ADD,
  comment,
});

export const addComment = (
  comment: Comment,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.comments.add(comment).then(comment => dispatch(commentAdded(comment)));

export const getCommentsByAuthor = (
  username: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.comments
    .getByAuthor(username)
    .then(comments => dispatch(addComments(comments)));

export const getNotVerifiedComments = (): ThunkAction<
  void,
  AppState,
  null,
  Action<string>
> => dispatch =>
  api.comments
    .getNotVerified()
    .then(comments => dispatch(addComments(comments)));

export type CommentsActionTypes = addCommentsAction | commentAddedAction;
