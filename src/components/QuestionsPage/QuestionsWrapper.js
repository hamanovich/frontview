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
import { getQLists } from '../../actions/qlists';

import { QuestionType } from '../../propTypes';

const { shape, func, string, arrayOf } = PropTypes;

export default (WrappedComponent) => {
  class QuestionsWrapper extends Component {
    static propTypes = {
      questions: arrayOf(QuestionType).isRequired,
      getQuestions: func.isRequired,
      getQLists: func.isRequired,
      getTopQuestions: func.isRequired,
      getQuestionsByFilter: func.isRequired,
      getQuestionsByAuthor: func.isRequired,
      getSearchedQuestions: func.isRequired,
      addFlashMessage: func.isRequired,
      auth: shape({
        user: shape({
          username: string
        })
      }).isRequired,
      match: shape({
        params: shape({
          filter: string,
          tag: string,
          page: string,
          username: string
        }),
        path: string
      }).isRequired,
      location: shape({
        search: string
      }).isRequired,
      history: shape({
        push: func.isRequired
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
      const { match, getTopQuestions, getQLists, location, auth } = this.props;
      const { filter, tag, page = 1, username } = match.params;
      const searchQuery = new URLSearchParams(location.search).get('q');

      getQLists(auth.user._id);

      if (searchQuery) {
        this.getQueryQuestions(searchQuery);
      } else if (filter) {
        this.filter(filter, tag);
      } else if (match.path === '/questions/top') {
        getTopQuestions();
      } else if (username) {
        this.getAuthorsQuestions(username);
      } else {
        this.getPageQuestions(page);
      }
    }

    getPageQuestions = (page) => {
      const { getQuestions, addFlashMessage, history } = this.props;

      getQuestions(Number(page))
        .then(({ pages, count }) => {
          this.setState({
            pagination: { pages, activePage: Number(page), count }
          });
        }).catch((err) => {
          addFlashMessage({
            type: 'error',
            text: err.response.data.error
          });

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
        />
      );
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
    questions: state.questions,
    qlists: state.qlists
  });

  return connect(mapStateToProps, {
    addFlashMessage,
    getQLists,
    getQuestions,
    getTopQuestions,
    getQuestionsByFilter,
    getQuestionsByAuthor,
    editQuestionField,
    getSearchedQuestions
  })(QuestionsWrapper);
};