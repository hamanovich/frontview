import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addFlashMessage } from '../../actions/flash';
import {
  getQuestions,
  getTopQuestions,
  editQuestionField,
  getSearchedQuestions,
  getQuestionsByFilter,
  getQuestionsByAuthor
} from '../../actions/questions';

import { QuestionType } from '../../propTypes';

export default (WrappedComponent) => {
  class QuestionsWrapper extends Component {
    static propTypes = {
      questions: PropTypes.arrayOf(QuestionType).isRequired,
      getQuestions: PropTypes.func.isRequired,
      getTopQuestions: PropTypes.func.isRequired,
      getQuestionsByFilter: PropTypes.func.isRequired,
      getQuestionsByAuthor: PropTypes.func.isRequired,
      getSearchedQuestions: PropTypes.func.isRequired,
      addFlashMessage: PropTypes.func.isRequired,
      match: PropTypes.shape({
        params: PropTypes.shape({
          filter: PropTypes.string,
          tag: PropTypes.string,
          page: PropTypes.nubmer,
          username: PropTypes.string
        }),
        path: PropTypes.string
      }).isRequired,
      location: PropTypes.shape({
        search: PropTypes.string
      }).isRequired,
      history: PropTypes.shape({
        push: PropTypes.func.isRequired
      }).isRequired
    };

    state = {
      pagination: {
        activePage: 1,
        pages: 0,
        count: 0
      },
      searchQuery: '',
      filters: {
        filter: '',
        tags: [],
        tag: ''
      }
    };

    componentDidMount() {
      const { match, getTopQuestions, location } = this.props;
      const { filter, tag, page = 1, username } = match.params;
      const searchQuery = new URLSearchParams(location.search).get('q');

      if (searchQuery) {
        this.getQueryQuestions(searchQuery);
      } else if (filter) {
        this.filter(filter, tag);
      } else if (match.path === '/questions/top') {
        getTopQuestions();
      } else if (username) {
        this.getAuthorsQuestions(username);
      } else {
        this.onPageSelect(Number(page));
      }
    }

    onPageSelect = (activePage) => {
      const { addFlashMessage, getQuestions, match, history } = this.props;

      getQuestions(activePage)
        .then(({ pages, count }) => {
          this.setState({
            pagination: { pages, activePage, count }
          });

          if (Number(match.params.page) !== activePage) {
            history.push(`/questions/page/${activePage}`);
          }
        }).catch((err) => {
          addFlashMessage({
            type: 'error',
            text: err.response.data.error
          });

          this.setState({ questions: [] });

          history.push('/questions');
        });
    };

    getAuthorsQuestions = (author) => {
      const { getQuestionsByAuthor, addFlashMessage, history } = this.props;

      getQuestionsByAuthor(author)
        .catch((err) => {
          addFlashMessage({
            type: 'error',
            text: err.response.data.error
          });

          history.push('/questions');
        });
    };

    getQueryQuestions = (query) => {
      const { getSearchedQuestions, addFlashMessage, questions, history } = this.props;

      this.setState({ searchQuery: query });

      if (questions.length > 0) return;

      getSearchedQuestions(query).then((res) => {
        if (!res.length) {
          addFlashMessage({
            type: 'warn',
            text: `Nothing found by search = ${query}`
          });

          history.push('/questions/page/1');
        }
      });
    };

    filter = (filter, tag = '') => {
      const { match, getQuestionsByFilter, addFlashMessage, history } = this.props;

      getQuestionsByFilter(filter, tag).then(({ tags, questions }) => {
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

        this.setState({ filters: { filter, tags, tag } });
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          state={this.state}
          onPageSelect={this.onPageSelect}
        />
      );
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
    questions: state.questions
  });

  return connect(mapStateToProps, {
    addFlashMessage,
    getQuestions,
    getTopQuestions,
    getQuestionsByFilter,
    getQuestionsByAuthor,
    editQuestionField,
    getSearchedQuestions
  })(QuestionsWrapper);
};