import React, { FunctionComponent, Fragment } from 'react';

import Comment from './Comment';
import Loader from '../../utils/Loader';
import { CommentQuestion, User } from '../../propTypes';

type CommentsProps = {
  comments: CommentQuestion[];
  match: {
    params: {
      username: string;
    };
  } | null;
  user: User;
};

const Comments: FunctionComponent<CommentsProps> = ({
  comments,
  match,
  user,
}) => (
  <Fragment>
    {comments.map((comment: CommentQuestion) => (
      <Comment comment={comment} match={match} key={comment._id} user={user} />
    ))}
  </Fragment>
);

Comments.defaultProps = {
  match: null,
};

export default Loader('comments')(Comments);
