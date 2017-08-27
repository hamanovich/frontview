import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addFlashMessage } from '../../actions/flash';
import {
  getQuestions,
  editQuestionField,
  getSearchedQuestions,
  getQuestionsByFilter
} from '../../actions/questions';

export default (WrappedComponent) => {
  class QuestionsWrapper extends Component {
    static propTypes = {
      auth: PropTypes.shape({
        user: PropTypes.object,
        isAuthenticated: PropTypes.bool.isRequired
      }).isRequired,
      questions: PropTypes.array.isRequired,
      getQuestions: PropTypes.func.isRequired,
      getQuestionsByFilter: PropTypes.func.isRequired,
      editQuestionField: PropTypes.func.isRequired,
      getSearchedQuestions: PropTypes.func.isRequired,
      addFlashMessage: PropTypes.func.isRequired
    };

    static contextTypes = {
      router: PropTypes.object.isRequired
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

    componentWillMount() {
      const { match } = this.props;
      const { search } = this.context.router.route.location;
      const { filter, tag, page } = match.params;
      const searchQuery = new URLSearchParams(search).get('q');

      if (searchQuery) {
        this.getQueryQuestions(searchQuery);
      } else if (filter) {
        this.filter(filter, tag);
      } else {
        this.onPageSelect(Number(page));
      }
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

          this.setState({ filters: { filter, tags, tag } });
        });
    };

    onPageSelect = (activePage) => {
      const { addFlashMessage, getQuestions, match } = this.props;

      getQuestions(activePage)
        .then(
        ({ pages, count, questions }) => {
          this.setState({
            questions,
            pagination: { pages, activePage, count }
          });

          if (Number(match.params.page) !== activePage) {
            this.context.router.history.push(`/questions/page/${activePage}`);
          }
        },
        (err) => {
          addFlashMessage({
            type: 'error',
            text: err.response.data.error
          });

          this.setState({ questions: [] });
        }
        );
    };

    getQueryQuestions = (query) => {
      const { getSearchedQuestions, addFlashMessage, questions } = this.props;
      const { history } = this.context.router;

      this.setState({ searchQuery: query });

      if (questions.length > 0) return;

      getSearchedQuestions(query).then(
        (res) => {
          if (!res.length) {
            addFlashMessage({
              type: 'warn',
              text: `Nothing found by search = ${query}`
            });

            history.push('/questions/page/1');
          }
        }
      );
    };

    render() {
      return <WrappedComponent
        {...this.props}
        state={this.state}
        onPageSelect={this.onPageSelect}
      />
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
    questions: state.questions
  });

  return connect(mapStateToProps, {
    addFlashMessage,
    getQuestions,
    getQuestionsByFilter,
    editQuestionField,
    getSearchedQuestions
  })(QuestionsWrapper);
};