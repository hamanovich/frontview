import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import { Helmet } from 'react-helmet';

import Container from 'react-bootstrap/Container';

import Comments from './Comments';

import { addFlashMessage } from '../../actions/flash';
import { getCommentsByAuthor } from '../../actions/comments';

import { CommentType } from '../../propTypes';

const enhance = compose(
  connect(
    state => ({ comments: state.comments }),
    { addFlashMessage, getCommentsByAuthor },
  ),

  lifecycle({
    componentDidMount() {
      const { match, addFlashMessage, getCommentsByAuthor, history, auth } = this.props;

      getCommentsByAuthor(match.params.username).catch(err => {
        addFlashMessage({
          type: 'error',
          text: err.response.data.error,
        });

        history.push(`/comments/${auth.user.username}`);
      });
    },
  }),
);

const CommentsAuthorPage = ({ comments, match }) => (
  <Container>
    <Helmet>
      <title>Frontview: All comments</title>
    </Helmet>
    <h1>
      <FontAwesome name="comments-o" /> All Your Comments
    </h1>

    <Comments comments={comments} match={match} />
  </Container>
);

CommentsAuthorPage.propTypes = {
  comments: arrayOf(CommentType).isRequired,
  match: shape({
    params: shape({
      username: string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default enhance(CommentsAuthorPage);
