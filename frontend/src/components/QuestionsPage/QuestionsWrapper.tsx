import 'url-search-params-polyfill';
import React from 'react';
import { connect } from 'react-redux';

import { addFlashMessage } from '../../actions/flash';
import {
  getQuestions,
  getTopQuestions,
  getSearchedQuestions,
  getQuestionsByAuthor,
} from '../../actions/questions';
import { getQLists, getQListQuestions } from '../../actions/qlists';

import {
  QuestionsWrapperProps,
  QuestionsWrapperState,
  GetQuestionsError,
  QuestionsWrapperStateProps,
} from './models';
import { Question } from '../../propTypes/QuestionType';

const WrappedComponent = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  class QuestionsWrapper extends React.Component<
    QuestionsWrapperProps,
    QuestionsWrapperState
  > {
    state: QuestionsWrapperState = {
      pagination: {
        activePage: 1,
        pages: 1,
        count: 1,
      },
    };

    componentDidMount() {
      const {
        match,
        location,
        getTopQuestions,
        getQListQuestions,
      } = this.props;
      const { page = 1, username, slug } = match.params;
      const searchQuery = new URLSearchParams(location.search).get('q');

      if (searchQuery) {
        this.getQueryQuestions(searchQuery);
      } else if (match.path === '/questions/top') {
        getTopQuestions();
      } else if (username && !slug) {
        this.getAuthorsQuestions(username);
      } else if (username && slug) {
        getQListQuestions(username, slug);
      } else {
        this.getPageQuestions(page);
      }
    }

    getPageQuestions = (page: string | number) => {
      const {
        getQuestions,
        getQLists,
        addFlashMessage,
        history,
        user,
      } = this.props;

      getQuestions(Number(page))
        .then(({ pages, count }: { pages: number; count: number }) => {
          this.setState({
            pagination: {
              pages: Number(pages),
              activePage: Number(page),
              count: Number(count),
            },
          });

          if (user.username) getQLists(user.username);
        })
        .catch((err: GetQuestionsError) => {
          addFlashMessage({
            type: 'error',
            text:
              err.response && err.response.data.error
                ? err.response.data.error
                : `${err.message}. Please check your internet connection`,
          });

          history.push('/');
        });
    };

    getAuthorsQuestions = (author: string) => {
      const {
        getQuestionsByAuthor,
        getQLists,
        user,
        addFlashMessage,
        history,
      } = this.props;

      getQuestionsByAuthor(author)
        .then(() => {
          getQLists(user.username);
        })
        .catch((err: GetQuestionsError) => {
          addFlashMessage({
            type: 'error',
            text:
              err.response && err.response.data.error
                ? err.response.data.error
                : `${err.message}. Please check your internet connection`,
          });

          history.push('/questions');
        });
    };

    getQueryQuestions = (query: any) => {
      const {
        getSearchedQuestions,
        getQLists,
        addFlashMessage,
        questions,
        history,
        user,
      } = this.props;

      if (questions.length > 0) return;

      getSearchedQuestions(query).then((res: Question[]) => {
        if (!res.length) {
          addFlashMessage({
            type: 'warn',
            text: `Nothing found by search = ${query}`,
          });

          history.push('/questions/page/1');
        }

        getQLists(user.username);
      });
    };

    render() {
      return <Component {...(this.props as P)} state={this.state} />;
    }
  }

  const mapStateToProps = ({
    auth,
    questions,
    qlists,
  }: QuestionsWrapperStateProps) => ({
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
      getQListQuestions,
      getQuestionsByAuthor,
      getSearchedQuestions,
    },
  )(QuestionsWrapper as any);
};

export default WrappedComponent;
