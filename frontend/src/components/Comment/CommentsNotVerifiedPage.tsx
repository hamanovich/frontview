import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Helmet } from 'react-helmet';

import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

import Comments from './Comments';
import { getNotVerifiedComments } from '../../actions/comments';
import { getSizeOfComments } from '../../selectors/comments';
import { CommentQuestion, Auth } from '../../propTypes';
import { CommentsAuthorPageState } from './CommentsAuthorPage';

type CommentsNotVerifiedPageType = {
  comments: CommentQuestion[];
  match: {
    params: {
      username: string;
    };
  };
  getNotVerifiedComments: () => void;
  auth: Auth;
  size: number;
};

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

const mapStateToProps = (state: CommentsAuthorPageState) => ({
  comments: state.comments,
  size: getSizeOfComments(state),
});

const mapDispatchToProps = { getNotVerifiedComments };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsNotVerifiedPage);
