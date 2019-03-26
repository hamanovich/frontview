import React, { FC, Fragment } from 'react';

import Questions from './Questions';
import QuestionsBar from './QuestionsBar';
import { QuestionsTagsProps } from './models';

const QuestionsTags: FC<QuestionsTagsProps> = ({ history, match }) => (
  <Fragment>
    <h1>
      Questions by &apos;
      {match.params.filter}
      &apos;
    </h1>

    <QuestionsBar
      history={history}
      active={match.params.tag}
      filter={match.params.filter}
    />

    <hr />

    <Questions />
  </Fragment>
);

export default QuestionsTags;
