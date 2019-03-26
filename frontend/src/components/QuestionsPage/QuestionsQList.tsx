import React, { FC, Fragment } from 'react';

import Questions from './Questions';
import { QuestionsQListProps } from './models';

const QuestionsQList: FC<QuestionsQListProps> = ({ qlists, match }) => (
  <Fragment>
    <h1>
      Questions from QList: <strong>{match.params.slug}</strong>
    </h1>
    <Questions
      questions={
        qlists[0] &&
        qlists.filter(qlist => qlist.slug === match.params.slug)[0].questions
      }
    />
  </Fragment>
);

export default QuestionsQList;
