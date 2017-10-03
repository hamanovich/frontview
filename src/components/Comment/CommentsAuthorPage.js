import React from 'react';
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

const mapStateToProps = state => ({ comments: state.comments });

const enhance = compose(
  connect(
    mapStateToProps,
    { addFlashMessage, getCommentsByAuthor }
  ),

  lifecycle({
    componentDidMount() {
      const { match, addFlashMessage, getCommentsByAuthor, history, auth } = this.props;

      getCommentsByAuthor(match.params.username)
        .catch((err) => {
          addFlashMessage({
            type: 'error',
            text: err.response.data.error
          });

          history.push(`/comments/${auth.user.username}`);
        });
    }
  })
);

const CommentsAuthorPage = ({ comments, match }) => (
  <section>
    <PageHeader>
      <FontAwesome name="comments-o" /> All Your Comments
    </PageHeader>

    <Comments comments={comments} match={match} />
  </section>
);

CommentsAuthorPage.propTypes = {
  comments: PropTypes.arrayOf(CommentType).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default enhance(CommentsAuthorPage);