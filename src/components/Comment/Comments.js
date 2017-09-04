import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import Comment from './Comment';
import Loader from '../../utils/Loader';

const Comments = ({ comments, match }) => (
  <div>
    {map(comments, comment => (
      <Comment
        comment={comment}
        match={match}
        key={comment._id}
      />
    ))}
  </div>
);

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  match: PropTypes.object
};

Comments.defaultProps = {
  match: null
};

export default Loader('comments')(Comments);