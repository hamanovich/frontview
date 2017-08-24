import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';

import Question from './Question';
import PaginationBar from '../layout/PaginationBar';

class Questions extends Component {
  static propTypes = {
    getQuestions: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    editQuestionField: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  state = {
    activePage: 1,
    pages: 0
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { params } = this.context.router.route.match;
    this.pageContent(Number(params.page) || this.state.activePage);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.pages === 0) {
      this.pageContent(nextState.activePage);
    }
  }

  pageContent = (activePage) => {
    const { addFlashMessage, getQuestions } = this.props;

    getQuestions(activePage)
      .then(
      ({ pages, questions }) => {
        this.setState({ questions, pages, activePage });
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
    const { user, editQuestionField, questions } = this.props;
    const { activePage, pages } = this.state;

    return (
      <div>
        {map(questions, (question, index) => (
          <Question
            question={question}
            editQuestionField={editQuestionField}
            key={question._id}
            user={user}
          />
        ))}

        <PaginationBar
          activePage={activePage}
          pages={pages}
          onSelect={this.pageContent}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  user: state.auth.user,
  questions: state.questions
 });

export default connect(mapStateToProps)(Questions);