import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
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
  removeQuestion,
  editQuestionField,
} from '../../../actions/questions';
import { addComment } from '../../../actions/comments';
import { getUser } from '../../../actions/auth';
import { getQLists } from '../../../actions/qlists';
import { addFlashMessage } from '../../../actions/flash';
import { Comment } from '../../../propTypes/CommentType';
import { GetQuestionsError, QuestionsWrapperStateProps } from '../models';
import { AddFlashMessageType, Question, User, QList } from '../../../propTypes';

type QuestionOneProps = {
  addFlashMessage: AddFlashMessageType;
  getQuestionBySlug: (slug: string) => any;
  getUser: (identifier: string) => void;
  getQLists: (username: string) => void;
  addComment: (comment: any) => any;
  match: {
    params: {
      slug: string;
    };
  };
  question: Question | undefined;
  user: User;
  qlists: QList[];
  approveQuestion: (id: string) => void;
  removeQuestion: (id: string) => void;
  editQuestionField: (id: string, field: string, value: string) => void;
  history: {
    push: (url: string) => void;
  };
};

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

  private getQuestion = (slug: string) => {
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

  private getVerifiedComments = (q: Question) =>
    q && q.comments.filter((comment: Comment) => comment.isVerified);

  render() {
    const {
      question,
      addComment,
      approveQuestion,
      removeQuestion,
      editQuestionField,
      addFlashMessage,
      user,
      qlists,
      match,
      history,
    } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>
            Frontview: {question ? question.question : 'The Question page '}
          </title>
        </Helmet>

        <h1>{question ? question.question : 'The Question page '}</h1>

        <QuestionSingle
          history={history}
          question={question}
          approveQuestion={approveQuestion}
          removeQuestion={removeQuestion}
          editQuestionField={editQuestionField}
          user={user}
          qlists={qlists}
          match={match}
        />

        {question &&
          typeof question.comments === 'object' &&
          this.getVerifiedComments(question).length > 0 && (
            <Fragment>
              <h3>
                <FontAwesome name="comments-o" /> Comments{' '}
                <Badge variant="primary">
                  {this.getVerifiedComments(question).length}
                </Badge>
              </h3>
              <Card border="info">
                <Card.Body>
                  <Comments comments={this.getVerifiedComments(question)} />
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
                  addFlashMessage={addFlashMessage}
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

const mapDispatchToProps = {
  getQuestionBySlug,
  getUser,
  getQLists,
  approveQuestion,
  removeQuestion,
  editQuestionField,
  addComment,
  addFlashMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionOne);
