import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';
import QuestionsBar from './QuestionsBar';

import { getQuestions, editQuestionField, getQuestionsByFilter } from '../../actions/questions';

class QuestionsTags extends Component {
  static propTypes = {
    getQuestions: PropTypes.func.isRequired,
    getQuestionsByFilter: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    editQuestionField: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    tags: [],
    active: '',
    filter: ''
  };

  componentDidMount() {
    const { match } = this.props;
    this.filter(match.params.filter, match.params.tag);
  }

  filter = (filter, tag = '') => {
    const { match, getQuestionsByFilter, addFlashMessage } = this.props;
    const { history } = this.context.router;

    getQuestionsByFilter(filter, tag).then(
      ({ tags, questions }) => {
        if (!tags.length) {
          addFlashMessage({
            type: 'warn',
            text: `There is no filter - ${match.params.filter}. Please change filter`
          });

          history.push('/questions');

          return;
        }

        if (!questions.length) {
          addFlashMessage({
            type: 'warn',
            text: 'No questions found. Please change filter'
          });
        }        

        this.setState({ tags, active: tag, filter });
      });
  };

  render() {
    const { user, questions, editQuestionField } = this.props;
    const { active, tags, filter } = this.state;

    return (
      <div>
        <PageHeader>Questions</PageHeader>

        <QuestionsBar
          active={active}
          tags={tags}
          filter={filter}
        />

        <hr />

        <Questions
          user={user}
          questions={questions}
          editQuestionField={editQuestionField}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  questions: state.questions
});

export default connect(mapStateToProps, {
  getQuestions,
  getQuestionsByFilter,
  editQuestionField
})(QuestionsTags);