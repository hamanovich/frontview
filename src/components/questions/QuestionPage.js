import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Questions from './Questions';

import { getQuestions, editQuestionField } from '../../actions/questions';
import { addFlashMessage } from '../../actions/flashMessages';

class QuestionsPage extends Component {
  static propTypes = {
    getQuestions: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    editQuestionField: PropTypes.func.isRequired
  };

  render() {
    const { getQuestions, editQuestionField, addFlashMessage } = this.props;

    return (
      <div>
        <h1>Questions</h1>
        <Questions
          getQuestions={getQuestions}
          addFlashMessage={addFlashMessage}
          editQuestionField={editQuestionField}
        />
      </div>
    );
  }
}

export default connect(null, { getQuestions, editQuestionField, addFlashMessage })(QuestionsPage);
