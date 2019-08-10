import { createSelector } from 'reselect';

import { Comment } from '../propTypes/CommentType';
import { CommentsAuthorPageState } from '../components/Comment/models';

const commentsSelector = (state: CommentsAuthorPageState) => state.comments;

export const getSizeOfComments = createSelector(
  [commentsSelector],
  (comments: Comment[]) => comments.length,
);
