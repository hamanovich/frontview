import React, { Component, Fragment } from 'react';
import { shape, arrayOf, func, string } from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import Question from '../Question';
import CommentForm from '../../Comment/CommentForm';
import Comments from '../../Comment/Comments';

import { getQuestionBySlug, approveQuestion, editQuestionField } from '../../../actions/questions';
import { addComment } from '../../../actions/comments';
import { getUser } from '../../../actions/signup';
import { getQLists } from '../../../actions/qlists';
import { addFlashMessage } from '../../../actions/flash';

import { UserType, QuestionType, QListType } from '../../../propTypes';

class QuestionOne extends Component {
  static propTypes = {
    addFlashMessage: func.isRequired,
    getQuestionBySlug: func.isRequired,
    getUser: func.isRequired,
    getQLists: func.isRequired,
    addComment: func.isRequired,
    match: shape({
      params: shape({
        slug: string.isRequired,
      }).isRequired,
    }).isRequired,
    question: QuestionType,
    user: UserType.isRequired,
    qlists: arrayOf(QListType).isRequired,
    approveQuestion: func.isRequired,
    editQuestionField: func.isRequired,
    history: shape({
      push: func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    question: null,
  };

  componentDidMount() {
    const { getUser, getQLists, match, user } = this.props;

    if (user._id) {
      getUser(user.username);
      getQLists(user._id);
    }

    this.getQuestion(match.params.slug);
  }

  getQuestion = slug => {
    const { getQuestionBySlug, addFlashMessage, history } = this.props;

    getQuestionBySlug(slug)
      .then(res => {
        if (res.status === 500) {
          addFlashMessage({
            type: 'error',
            text: res.data.error,
          });

          history.push('/questions/add');
        }
      })
      .catch(err => {
        addFlashMessage({
          type: 'error',
          text:
            err.response && err.response.data.error
              ? err.response.data.error
              : `${err.message}. Please check your internet connection`,
        });

        history.push('/questions/page/1');
      });
  };

  render() {
    const {
      question,
      addComment,
      approveQuestion,
      editQuestionField,
      user,
      qlists,
      match,
      history,
    } = this.props;

    return (
      <Fragment>
        <h1>The Question page</h1>

        <Question
          history={history}
          question={question}
          approveQuestion={approveQuestion}
          editQuestionField={editQuestionField}
          user={user}
          qlists={qlists}
        />

        {question && question.comments.length > 0 && (
          <Fragment>
            <h3>
              <FontAwesome name="comments-o" /> Comments{' '}
              <Badge variant="primary">{question.comments.length}</Badge>
            </h3>
            <Card border="info">
              <Card.Body>
                <Comments comments={question.comments} />
              </Card.Body>
            </Card>
          </Fragment>
        )}
        {user.username && question && (
          <Fragment>
            <h3>
              <FontAwesome name="commenting-o" /> Add a comment
            </h3>

            <Card border="primary">
              <Card.Body>
                <CommentForm
                  question={question}
                  addComment={addComment}
                  getQuestion={this.getQuestion}
                  user={user}
                  slug={match.params.slug}
                />
              </Card.Body>
            </Card>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const question = state.questions.find(question => question.slug === props.match.params.slug);

  return {
    user: state.auth.user,
    qlists: state.qlists,
    question,
  };
};

export default connect(
  mapStateToProps,
  {
    getQuestionBySlug,
    getUser,
    getQLists,
    approveQuestion,
    editQuestionField,
    addComment,
    addFlashMessage,
  },
)(QuestionOne);
