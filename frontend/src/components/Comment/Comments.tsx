import React, { FunctionComponent, Fragment } from 'react';

import Comment from './Comment';
import Loader from '../../utils/Loader';
import { CommentsProps } from './models';
import { CommentQuestion } from '../../propTypes/CommentType';

const Comments: FunctionComponent<CommentsProps> = ({ comments, match }) => (
  <Fragment>
    {comments.map((comment: CommentQuestion) => (
      <Comment comment={comment} match={match} key={comment._id} />
    ))}
  </Fragment>
);

Comments.defaultProps = {
  match: null,
};

export default Loader('comments')(Comments);
