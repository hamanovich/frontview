import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';

import Questions from './Questions';
import QuestionsBar from './QuestionsBar';

const QuestionsTags = ({ match }) => (
  <Fragment>
    <h1>
      Questions by &apos;
      {match.params.filter}
      &apos;
    </h1>

    <QuestionsBar active={match.params.tag} filter={match.params.filter} />

    <hr />

    <Questions />
  </Fragment>
);

QuestionsTags.propTypes = {
  match: shape({
    params: shape({
      filter: string,
      tag: string,
    }),
    path: string,
  }).isRequired,
};

export default QuestionsTags;
