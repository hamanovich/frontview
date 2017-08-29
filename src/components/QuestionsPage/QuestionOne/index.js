import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import map from 'lodash/map';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';


import Question from '../Question';
import CommentForm from './CommentForm';
import Comment from './Comment';

import { getQuestionBySlug, editQuestionField, voteQuestion } from '../../../actions/questions';
import { addComment } from '../../../actions/comments';
import { getUser } from '../../../actions/signup';
import { addFlashMessage } from '../../../actions/flash';

class QuestionOne extends Component {
  static propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    getQuestionBySlug: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    question: PropTypes.object,
    user: PropTypes.object.isRequired,
    editQuestionField: PropTypes.func.isRequired,
    voteQuestion: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static defaultProps = {
    userId: '',
    question: {}
  };

  componentDidMount = () => {
    const { getUser, match, user } = this.props;

    getUser(user.username);
    this.getQuestion(match.params.slug);
  };

  getQuestion = (slug) => {
    const { history } = this.context.router;
    const { getQuestionBySlug, addFlashMessage } = this.props;

    getQuestionBySlug(slug).then(
      (res) => {
        if (res.status === 500) {
          addFlashMessage({
            type: 'error',
            text: res.data.error
          });

          history.push('/questions/add');
        }
      },
      (err) => {
        addFlashMessage({
          type: 'error',
          text: err.response.data.error
        });

        history.push('/questions/add');
      }
    );
  }

  render() {
    const { question, addComment, editQuestionField, voteQuestion, user } = this.props;
    const panelHeader = (<span><FontAwesome name="comments-o" /> Comments</span>);
    const panelAddHeader = (<span><FontAwesome name="commenting-o" /> Add comment</span>);

    return (
      <div>
        <PageHeader>Single Question</PageHeader>

        <Question
          question={question}
          editQuestionField={editQuestionField}
          voteQuestion={voteQuestion}
          user={user} />

        <PanelGroup defaultActiveKey="1" accordion>
          <Panel header={panelHeader} eventKey="1" bsStyle="info">
            {map(question.comments, comment => (
              <Comment
                comment={comment}
                key={comment._id} />
            ))}
          </Panel>
          {user.username && (
            <Panel header={panelAddHeader} eventKey="2" bsStyle="primary">
              <CommentForm
                question={question}
                addComment={addComment}
                getQuestion={this.getQuestion}
                user={user} />
            </Panel>
          )}
        </PanelGroup>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const question = state.questions.filter(question => question.slug === props.match.params.slug)[0];

  return {
    user: state.auth.user,
    gravatar: state.auth.user.gravatar,
    question
  };
};

export default connect(mapStateToProps, {
  getQuestionBySlug,
  getUser,
  editQuestionField,
  voteQuestion,
  addComment,
  addFlashMessage
})(QuestionOne);