import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import api from '../api';
import { AppState } from '../reducers';
import { Comment } from '../propTypes/CommentType';
import {
  COMMENTS_ADD,
  COMMENT_ADD,
  COMMENT_APPROVE,
  COMMENT_REMOVE,
} from './types';

interface addCommentsAction {
  type: typeof COMMENTS_ADD;
  comments: Comment[];
}

interface commentAddedAction {
  type: typeof COMMENT_ADD;
  comment: Comment;
}

interface commentApproveAction {
  type: typeof COMMENT_APPROVE;
  comment: Comment;
}

interface commentRemovedAction {
  type: typeof COMMENT_REMOVE;
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

export const commentApproved = (comment: Comment) => ({
  type: COMMENT_APPROVE,
  comment,
});

export const commentRemoved = (comment: Comment) => ({
  type: COMMENT_REMOVE,
  comment,
});

export const addComment = (
  comment: Comment,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.comments.add(comment).then(comment => dispatch(commentAdded(comment)));

export const approveComment = (
  id: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.comments.approve(id).then(comment => dispatch(commentApproved(comment)));

export const removeComment = (
  id: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.comments.remove(id).then(comment => dispatch(commentRemoved(comment)));

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

export type CommentsActionTypes =
  | addCommentsAction
  | commentAddedAction
  | commentApproveAction
  | commentRemovedAction;
