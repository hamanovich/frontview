import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';
import QuestionsBar from './QuestionsBar';

const QuestionsTags = ({ match }) => (
  <Fragment>
    <PageHeader>
      Questions by &apos;
      {match.params.filter}
      &apos;
    </PageHeader>

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
