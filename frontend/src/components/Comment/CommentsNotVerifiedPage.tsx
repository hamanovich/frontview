import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Helmet } from 'react-helmet';

import Container from 'react-bootstrap/Container';

import Comments from './Comments';
import { getNotVerifiedComments } from '../../actions/comments';
import { CommentsNotVerifiedPageType, CommentsAuthorPageState } from './models';

const CommentsNotVerifiedPage: FunctionComponent<
  CommentsNotVerifiedPageType
> = ({ getNotVerifiedComments, comments, match }) => {
  useEffect(() => {
    getNotVerifiedComments();
  }, [getNotVerifiedComments]);

  return (
    <Container>
      <Helmet>
        <title>Frontview: Not Verified Comments</title>
      </Helmet>
      <h1>
        <FontAwesome name="commenting-o" /> Not Verified Comments
      </h1>

      {comments.length > 0 ? (
        <Comments comments={comments} match={match} />
      ) : (
        'No unreviewed comments found'
      )}
    </Container>
  );
};

export default connect(
  (state: CommentsAuthorPageState) => ({ comments: state.comments }),
  { getNotVerifiedComments },
)(CommentsNotVerifiedPage);
