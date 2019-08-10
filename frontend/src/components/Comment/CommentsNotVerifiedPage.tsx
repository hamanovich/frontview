import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Helmet } from 'react-helmet';

import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

import Comments from './Comments';
import { getNotVerifiedComments } from '../../actions/comments';
import { getSizeOfComments } from '../../selectors/comments';
import { CommentsNotVerifiedPageType, CommentsAuthorPageState } from './models';

const CommentsNotVerifiedPage: FunctionComponent<
  CommentsNotVerifiedPageType
> = ({ getNotVerifiedComments, size, comments, match, auth }) => {
  useEffect(() => {
    getNotVerifiedComments();
  }, [getNotVerifiedComments]);

  return (
    <Container>
      <Helmet>
        <title>Frontview: Not Verified Comments</title>
      </Helmet>
      <h1>
        <FontAwesome name="commenting-o" /> Not Verified Comments{' '}
        {size > 0 && <Badge variant="dark">{size}</Badge>}
      </h1>

      {size > 0 ? (
        <Comments comments={comments} match={match} role={auth.user.role} />
      ) : (
        'No unreviewed comments found'
      )}
    </Container>
  );
};

export default connect(
  (state: CommentsAuthorPageState) => ({
    comments: state.comments,
    size: getSizeOfComments(state),
  }),
  { getNotVerifiedComments },
)(CommentsNotVerifiedPage);
