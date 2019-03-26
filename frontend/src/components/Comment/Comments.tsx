import React, { FC, Fragment } from 'react';
import map from 'lodash/map';

import Comment from './Comment';
import Loader from '../../utils/Loader';
import { CommentsProps } from './models';

const Comments: FC<CommentsProps> = ({ comments, match }) => (
  <Fragment>
    {map(comments, comment => (
      <Comment comment={comment} match={match} key={comment._id} />
    ))}
  </Fragment>
);

Comments.defaultProps = {
  match: null,
};

export default Loader('comments')(Comments);
