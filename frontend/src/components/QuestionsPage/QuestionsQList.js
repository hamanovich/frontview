import React, { Fragment } from 'react';
import { shape, arrayOf, string } from 'prop-types';

import Questions from './Questions';

import { QListType } from '../../propTypes';

const QuestionsQList = ({ qlists, match }) => (
  <Fragment>
    <h1>
      Questions from QList: <strong>{match.params.slug}</strong>
    </h1>
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
