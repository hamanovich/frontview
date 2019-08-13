import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import api from '../api';
import { AppState } from '../reducers';
import { Comment } from '../propTypes';
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

export type CommentsActionTypes =
  | addCommentsAction
  | commentAddedAction
  | commentApproveAction
  | commentRemovedAction;

export const addComments = (comments: Comment[]): CommentsActionTypes => ({
  type: COMMENTS_ADD,
  comments,
});

export const commentAdded = (comment: Comment): CommentsActionTypes => ({
  type: COMMENT_ADD,
  comment,
});

export const commentApproved = (comment: Comment): CommentsActionTypes => ({
  type: COMMENT_APPROVE,
  comment,
});

export const commentRemoved = (comment: Comment): CommentsActionTypes => ({
  type: COMMENT_REMOVE,
  comment,
});

export const addComment = (
  comment: Comment,
): ThunkAction<
  Promise<CommentsActionTypes>,
  AppState,
  null,
  Action<string>
> => (dispatch: ThunkDispatch<{}, {}, Action<string>>) =>
  api.comments.add(comment).then(comment => dispatch(commentAdded(comment)));

export const approveComment = (
  id: string,
): ThunkAction<
  Promise<CommentsActionTypes>,
  AppState,
  null,
  Action<string>
> => (
  dispatch: ThunkDispatch<{}, {}, Action<string>>,
): Promise<CommentsActionTypes> =>
  api.comments.approve(id).then(comment => dispatch(commentApproved(comment)));

export const removeComment = (
  id: string,
): ThunkAction<
  Promise<CommentsActionTypes>,
  AppState,
  null,
  Action<string>
> => (
  dispatch: ThunkDispatch<{}, {}, Action<string>>,
): Promise<CommentsActionTypes> =>
  api.comments.remove(id).then(comment => dispatch(commentRemoved(comment)));

export const getCommentsByAuthor = (
  username: string,
): ThunkAction<
  Promise<CommentsActionTypes>,
  AppState,
  null,
  Action<string>
> => (
  dispatch: ThunkDispatch<{}, {}, Action<string>>,
): Promise<CommentsActionTypes> =>
  api.comments
    .getByAuthor(username)
    .then(comments => dispatch(addComments(comments)));

export const getNotVerifiedComments = (): ThunkAction<
  Promise<CommentsActionTypes>,
  AppState,
  null,
  Action<string>
> => (dispatch: ThunkDispatch<{}, {}, Action<string>>) =>
  api.comments
    .getNotVerified()
    .then(comments => dispatch(addComments(comments)));
