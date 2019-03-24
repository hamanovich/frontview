import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import QuestionSingle from '../Question';
import CommentForm from '../../Comment/CommentForm';
import Comments from '../../Comment/Comments';
import {
  getQuestionBySlug,
  approveQuestion,
  editQuestionField,
} from '../../../actions/questions';
import { addComment } from '../../../actions/comments';
import { getUser } from '../../../actions/auth';
import { getQLists } from '../../../actions/qlists';
import { addFlashMessage } from '../../../actions/flash';
import { QuestionOneProps } from './models';
import { GetQuestionsError, QuestionsWrapperStateProps } from '../models';

class QuestionOne extends Component<QuestionOneProps> {
  static defaultProps = {
    question: undefined,
  };

  componentDidMount() {
    const { getUser, getQLists, match, user } = this.props;

    if (user.username) {
      getUser(user.username);
      getQLists(user.username);
    }

    this.getQuestion(match.params.slug);
  }

  getQuestion = (slug: string) => {
    const { getQuestionBySlug, addFlashMessage, history } = this.props;

    getQuestionBySlug(slug)
      .then((res: any) => {
        if (res.status === 500) {
          addFlashMessage({
            type: 'error',
            text: res.data.error,
          });

          history.push('/questions/add');
        }
      })
      .catch((err: GetQuestionsError) => {
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

        <QuestionSingle
          history={history}
          question={question}
          approveQuestion={approveQuestion}
          editQuestionField={editQuestionField}
          user={user}
          qlists={qlists}
          match={match}
        />

        {question &&
          typeof question.comments === 'object' &&
          question.comments.length > 0 && (
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

const mapStateToProps = (
  state: QuestionsWrapperStateProps,
  props: { match: { params: { slug: string } } },
) => {
  const question = state.questions.find(
    question => question.slug === props.match.params.slug,
  );

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
