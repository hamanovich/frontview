import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

import PageHeader from 'react-bootstrap/lib/PageHeader';

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
  <Fragment>
    <PageHeader>
      <FontAwesome name="comments-o" /> All Your Comments
    </PageHeader>

    <Comments comments={comments} match={match} />
  </Fragment>
);

const { arrayOf, shape, string } = PropTypes;

CommentsAuthorPage.propTypes = {
  comments: arrayOf(CommentType).isRequired,
  match: shape({
    params: shape({
      username: string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default enhance(CommentsAuthorPage);
