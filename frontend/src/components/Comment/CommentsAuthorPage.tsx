import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Helmet } from 'react-helmet';

import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

import Comments from './Comments';
import { addFlashMessage } from '../../actions/flash';
import { getCommentsByAuthor } from '../../actions/comments';
import { Auth, CommentQuestion, AddFlashMessageType } from '../../propTypes';

type CommentsByAuthorError = {
  message?: string;
  response?: {
    data: {
      error: string;
    };
  };
};

export type CommentsAuthorPageState = {
  match: {
    params: {
      username: string;
    };
  };
  addFlashMessage: AddFlashMessageType;
  getCommentsByAuthor: (username: string) => any;
  history: {
    push: (url: string) => void;
  };
  auth: Auth;
  comments: CommentQuestion[];
};

const CommentsAuthorPage: FunctionComponent<CommentsAuthorPageState> = ({
  getCommentsByAuthor,
  addFlashMessage,
  comments,
  match,
  history,
  auth,
}) => {
  useEffect(() => {
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
  }, [
    getCommentsByAuthor,
    addFlashMessage,
    auth.user.username,
    history,
    match.params.username,
  ]);

  return (
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
};

const mapStateToPros = (state: CommentsAuthorPageState) => ({
  comments: state.comments,
});

const mapDispatchToProps = { addFlashMessage, getCommentsByAuthor };

export default connect(
  mapStateToPros,
  mapDispatchToProps,
)(CommentsAuthorPage);
