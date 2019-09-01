import React, { FC, Fragment } from 'react';
import Helmet from 'react-helmet';
import FontAwesome from 'react-fontawesome';

import Questions from './Questions';
import { QuestionsAuthorProps } from './models';

const QuestionsAuthor: FC<QuestionsAuthorProps> = ({ match }) => (
  <Fragment>
    <Helmet>
      <title>
        Frontview:{' '}
        {match.params.username
          ? `${match.params.username} Questions`
          : 'Questions'}
      </title>
    </Helmet>
    <h1>
      <FontAwesome name="file-text-o" /> {match.params.username}
      &apos;s Questions
    </h1>

    <Questions />
  </Fragment>
);

export default QuestionsAuthor;
