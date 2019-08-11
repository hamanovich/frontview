import { createSelector } from 'reselect';

import { Comment } from '../propTypes/CommentType';
import { RootState } from '../reducers';

const commentsSelector = (state: RootState) => state.comments;

export const getSizeOfComments = createSelector(
  [commentsSelector],
  (comments: Comment[]) => comments.length,
);
