import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Badge from 'react-bootstrap/lib/Badge';

import Question from '../Question';
import CommentForm from '../../Comment/CommentForm';
import Comments from '../../Comment/Comments';

import { getQuestionBySlug, editQuestionField } from '../../../actions/questions';
import { addComment } from '../../../actions/comments';
import { getUser } from '../../../actions/signup';
import { addFlashMessage } from '../../../actions/flash';

class QuestionOne extends Component {
  static propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    getQuestionBySlug: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    question: PropTypes.object,
    user: PropTypes.object.isRequired,
    editQuestionField: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  static defaultProps = {
    userId: '',
    question: null
  };

  componentDidMount = () => {
    const { getUser, match, user } = this.props;

    getUser(user.username);
    this.getQuestion(match.params.slug);
  };

  getQuestion = (slug) => {
    const { getQuestionBySlug, addFlashMessage, history } = this.props;

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
    const { question, addComment, editQuestionField, user } = this.props;
    const panelHeader = (<span><FontAwesome name="comments-o" /> Comments <Badge>{question && question.comments.length}</Badge></span>);
    const panelAddHeader = (<span><FontAwesome name="commenting-o" /> Add comment</span>);

    return (
      <div>
        <PageHeader>Single Question</PageHeader>

        <Question
          question={question}
          editQuestionField={editQuestionField}
          user={user}
        />

        <PanelGroup defaultActiveKey="1" accordion>
          {question && question.comments.length > 0 && (
            <Panel header={panelHeader} eventKey="1" bsStyle="info">
              <Comments comments={question.comments} />
            </Panel>
          )}
          {user.username && (
            <Panel header={panelAddHeader} eventKey="2" bsStyle="primary">
              <CommentForm
                question={question}
                addComment={addComment}
                getQuestion={this.getQuestion}
                user={user}
              />
            </Panel>
          )}
        </PanelGroup>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const question = state.questions.find(question => question.slug === props.match.params.slug);

  return {
    user: state.auth.user,
    question
  };
};

export default connect(mapStateToProps, {
  getQuestionBySlug,
  getUser,
  editQuestionField,
  addComment,
  addFlashMessage
})(QuestionOne);