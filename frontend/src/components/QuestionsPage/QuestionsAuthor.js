import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Questions from './Questions';

const QuestionsAuthor = ({ user }) => (
  <Fragment>
    <h1>
      <FontAwesome name="file-text-o" /> {user.username}
      &apos;s Questions
    </h1>

    <Questions />
  </Fragment>
);

QuestionsAuthor.propTypes = {
  user: shape({
    username: string,
  }).isRequired,
};

export default QuestionsAuthor;
