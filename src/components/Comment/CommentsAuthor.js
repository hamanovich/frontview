import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Comments from './Comments';

import { addFlashMessage } from '../../actions/flash';
import { getCommentsByAuthor } from '../../actions/comments';

class CommentsAuthor extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getCommentsByAuthor: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        username: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  componentDidMount() {
    const { match, addFlashMessage, getCommentsByAuthor } = this.props;

    getCommentsByAuthor(match.params.username)
      .catch((err) => {
        addFlashMessage({
          type: 'error',
          text: err.response.data.error
        });
      });
  }

  render() {
    const { comments, match } = this.props;

    return (
      <div>
        <PageHeader>
          <FontAwesome name="comments-o" /> All Your Comments
        </PageHeader>

        <Comments comments={comments} match={match} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ comments: state.comments });

export default connect(mapStateToProps, { addFlashMessage, getCommentsByAuthor })(CommentsAuthor);