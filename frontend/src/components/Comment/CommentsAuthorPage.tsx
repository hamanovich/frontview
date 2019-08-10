import React, { FC } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import { Helmet } from 'react-helmet';

import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

import Comments from './Comments';
import { addFlashMessage } from '../../actions/flash';
import { getCommentsByAuthor } from '../../actions/comments';
import {
  CommentsAuthorPageProps,
  CommentsAuthorPageLifecycleProps,
  CommentsByAuthorError,
  CommentsAuthorPageState,
} from './models';

const enhance = compose<CommentsAuthorPageProps, {}>(
  connect(
    (state: CommentsAuthorPageState) => ({ comments: state.comments }),
    { addFlashMessage, getCommentsByAuthor },
  ),

  lifecycle<CommentsAuthorPageLifecycleProps, {}>({
    componentDidMount() {
      const {
        match,
        addFlashMessage,
        getCommentsByAuthor,
        history,
        auth,
      } = this.props;

      getCommentsByAuthor(match.params.username).catch(
        (err: CommentsByAuthorError) => {
          addFlashMessage({
            type: 'error',
            text:
              err.response && err.response.data.error
                ? err.response.data.error
                : `${err.message}. Please check your internet connection`,
          });

          history.push(`/comments/${auth.user.username}`);
        },
      );
    },
  }),
);

const CommentsAuthorPage: FC<CommentsAuthorPageProps> = ({
  comments,
  match,
}) => (
  <Container>
    <Helmet>
      <title>Frontview: All comments</title>
    </Helmet>
    <h1>
      <FontAwesome name="comments-o" /> All Your Comments{' '}
      {comments.length > 0 && <Badge variant="dark">{comments.length}</Badge>}
    </h1>

    <Comments comments={comments} match={match} />
  </Container>
);

export default enhance(CommentsAuthorPage);
