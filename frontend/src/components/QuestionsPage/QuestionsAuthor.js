import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Questions from './Questions';

const QuestionsAuthor = ({ match }) => (
  <Fragment>
    <h1>
      <FontAwesome name="file-text-o" /> {match.params.username}
      &apos;s Questions
    </h1>

    <Questions />
  </Fragment>
);

QuestionsAuthor.propTypes = {
  match: shape({
    params: shape({
      username: string,
    }),
  }).isRequired,
};

export default QuestionsAuthor;
