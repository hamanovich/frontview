import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import Comment from './Comment';
import Loader from '../../utils/Loader';

import { CommentType } from '../../propTypes';

const Comments = ({ comments, match }) => (
  <section>
    {map(comments, comment => (
      <Comment
        comment={comment}
        match={match}
        key={comment._id}
      />
    ))}
  </section>
);

const { arrayOf, shape, string } = PropTypes;

Comments.propTypes = {
  comments: arrayOf(CommentType).isRequired,
  match: shape({
    params: shape({
      username: string.isRequired,
    }).isRequired,
  }),
};

Comments.defaultProps = {
  match: null,
};

export default Loader('comments')(Comments);