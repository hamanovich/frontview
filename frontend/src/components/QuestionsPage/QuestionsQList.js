import React, { Fragment } from 'react';
import { shape, arrayOf, string } from 'prop-types';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';

import { QListType } from '../../propTypes';

const QuestionsQList = ({ qlists, match }) => (
  <Fragment>
    <PageHeader>
      Questions from QList:
      {match.params.slug}
    </PageHeader>
    <span>
      {qlists[0] &&
        qlists.filter(qlist => qlist.slug === match.params.slug)[0].questions.length === 0 && (
          <span>nothing found</span>
        )}{' '}
    </span>
    <Questions
      questions={qlists[0] && qlists.filter(qlist => qlist.slug === match.params.slug)[0].questions}
    />
  </Fragment>
);

QuestionsQList.propTypes = {
  match: shape({
    params: shape({
      slug: string,
    }),
  }).isRequired,
  qlists: arrayOf(QListType).isRequired,
};

export default QuestionsQList;
