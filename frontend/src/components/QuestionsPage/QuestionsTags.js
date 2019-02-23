import React, { Fragment } from 'react';
import { func, shape, string } from 'prop-types';

import Questions from './Questions';
import QuestionsBar from './QuestionsBar';

const QuestionsTags = props => (
  <Fragment>
    <h1>
      Questions by &apos;
      {props.match.params.filter}
      &apos;
    </h1>

    <QuestionsBar
      history={props.history}
      active={props.match.params.tag}
      filter={props.match.params.filter}
    />

    <hr />

    <Questions />
  </Fragment>
);

QuestionsTags.propTypes = {
  history: shape({ push: func.isRequired }).isRequired,
  match: shape({
    params: shape({
      filter: string,
      tag: string,
    }),
    path: string,
  }).isRequired,
};

export default QuestionsTags;
