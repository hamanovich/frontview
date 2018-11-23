import React, { Component } from 'react';
import { shape, func, string, arrayOf } from 'prop-types';
import { connect } from 'react-redux';

import { addFlashMessage } from '../../actions/flash';
import {
  getQuestions,
  getTopQuestions,
  getSearchedQuestions,
  getQuestionsByAuthor,
} from '../../actions/questions';
import { getQLists } from '../../actions/qlists';

import { QuestionType } from '../../propTypes';

export default WrappedComponent => {
  class QuestionsWrapper extends Component {
    static propTypes = {
      questions: arrayOf(QuestionType).isRequired,
      getQuestions: func.isRequired,
      getQLists: func.isRequired,
      getTopQuestions: func.isRequired,
      getQuestionsByAuthor: func.isRequired,
      getSearchedQuestions: func.isRequired,
      addFlashMessage: func.isRequired,
      user: shape({
        username: string,
        _id: string,
      }).isRequired,
      match: shape({
        params: shape({
          filter: string,
          tag: string,
          page: string,
          username: string,
          slug: string,
        }),
        path: string,
      }).isRequired,
      location: shape({
        search: string,
      }).isRequired,
      history: shape({
        push: func.isRequired,
      }).isRequired,
    };

    state = {
      pagination: {
        activePage: 1,
        pages: 0,
        count: 0,
      },
    };

    componentDidMount() {
      const { match, location, getTopQuestions } = this.props;
      const { page = 1, username } = match.params;
      const searchQuery = new URLSearchParams(location.search).get('q');

      if (searchQuery) {
        this.getQueryQuestions(searchQuery);
      } else if (match.path === '/questions/top') {
        getTopQuestions();
      } else if (username) {
        this.getAuthorsQuestions(username);
      } else {
        this.getPageQuestions(page);
      }
    }

    getPageQuestions = page => {
      const { getQuestions, getQLists, addFlashMessage, history, user } = this.props;

      getQuestions(Number(page))
        .then(({ pages, count }) => {
          this.setState({
            pagination: { pages, activePage: Number(page), count },
          });

          if (user._id) getQLists(user._id);
        })
        .catch(err => {
          addFlashMessage({
            type: 'error',
            text: err.response.data.error
              ? err.response.data.error
              : '__500: Server-side error__. Please check your internet connection',
          });

          history.push('/');
        });
    };

    getAuthorsQuestions = author => {
      const { getQuestionsByAuthor, getQLists, user, addFlashMessage, history } = this.props;

      getQuestionsByAuthor(author)
        .then(() => {
          getQLists(user._id);
        })
        .catch(err => {
          addFlashMessage({
            type: 'error',
            text: err.response.data.error,
          });

          history.push('/questions');
        });
    };

    getQueryQuestions = query => {
      const {
        getSearchedQuestions,
        getQLists,
        addFlashMessage,
        questions,
        history,
        user,
      } = this.props;

      if (questions.length > 0) return;

      getSearchedQuestions(query).then(res => {
        if (!res.length) {
          addFlashMessage({
            type: 'warn',
            text: `Nothing found by search = ${query}`,
          });

          history.push('/questions/page/1');
        }

        getQLists(user._id);
      });
    };

    render() {
      return <WrappedComponent {...this.props} state={this.state} />;
    }
  }

  const mapStateToProps = ({ auth, questions, qlists }) => ({
    user: auth.user,
    questions,
    qlists,
  });

  return connect(
    mapStateToProps,
    {
      addFlashMessage,
      getQLists,
      getQuestions,
      getTopQuestions,
      getQuestionsByAuthor,
      getSearchedQuestions,
    },
  )(QuestionsWrapper);
};
