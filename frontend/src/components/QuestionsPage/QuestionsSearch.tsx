import React, { FC, Fragment } from 'react';
import FontAwesome from 'react-fontawesome';

import Questions from './Questions';
import { QuestionsSearchProps } from './models';

const QuestionsSearch: FC<QuestionsSearchProps> = ({ location }) => (
  <Fragment>
    <h1>
      <FontAwesome name="search-plus" /> Search: &apos;
      {new URLSearchParams(location.search).get('q')}
      &apos;
    </h1>

    <Questions />
  </Fragment>
);

export default QuestionsSearch;
