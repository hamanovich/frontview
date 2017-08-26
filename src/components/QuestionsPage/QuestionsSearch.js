import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';

import { getSearchedQuestions, editQuestionField } from '../../actions/questions';
import { addFlashMessage } from '../../actions/flash';

class QuestionsSearch extends Component {
  static propTypes = {
    getSearchedQuestions: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    editQuestionField: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { search } = this.context.router.route.location;
    const searchQuery = new URLSearchParams(search).get('q');

    this.getQuestions(searchQuery);
  }

  getQuestions = (query) => {
    const { getSearchedQuestions, addFlashMessage, questions } = this.props;
    const { history } = this.context.router;

    if (questions.length > 0) return;

    getSearchedQuestions(query).then(
      (res) => {
        if (!res.length) {
          addFlashMessage({
            type: 'warn',
            text: `Nothing found by search = ${query}`
          });

          history.push('/questions');
        }
      }
    );
  };

  render() {
    const { user, questions, editQuestionField, location } = this.props;
    const searchQuery = new URLSearchParams(location.search).get('q');

    return (
      <div>
        <PageHeader>Search: '{searchQuery}'</PageHeader>

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
  getSearchedQuestions,
  editQuestionField,
  addFlashMessage
})(QuestionsSearch);