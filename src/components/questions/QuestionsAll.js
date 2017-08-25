import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import Badge from 'react-bootstrap/lib/Badge';

import Questions from './Questions';
import PaginationBar from '../layout/PaginationBar';

import { getQuestions, editQuestionField } from '../../actions/questions';
import { addFlashMessage } from '../../actions/flashMessages';

class QuestionsAll extends Component {
  static propTypes = {
    getQuestions: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    editQuestionField: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    activePage: 1,
    pages: 0,
    count: 0
  };

  componentDidMount() {
    const { params } = this.props.match;
    this.onPageSelect(Number(params.page) || this.state.activePage);
  }

  onPageSelect = (activePage) => {
    const { addFlashMessage, getQuestions } = this.props;

    getQuestions(activePage)
      .then(
      ({ pages, count, questions }) => {
        this.setState({ questions, pages, activePage, count });
        this.context.router.history.push(`/questions/page/${activePage}`);
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

  render() {
    const { user, questions, editQuestionField } = this.props;
    const { activePage, pages, count } = this.state;

    return (
      <div>
        <PageHeader>Questions <Badge>{count}</Badge></PageHeader>

        <Questions
          user={user}
          questions={questions}
          editQuestionField={editQuestionField}
        />

        <PaginationBar
          activePage={activePage}
          pages={pages}
          onSelect={this.onPageSelect}
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
  editQuestionField,
  addFlashMessage
})(QuestionsAll);