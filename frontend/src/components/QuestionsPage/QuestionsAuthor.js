import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';

const QuestionsAuthor = ({ user }) => (
  <Fragment>
    <PageHeader>
      <FontAwesome name="file-text-o" /> {user.username}
      &apos;s Questions
    </PageHeader>

    <Questions />
  </Fragment>
);

const { shape, string } = PropTypes;

QuestionsAuthor.propTypes = {
  user: shape({
    username: string,
  }).isRequired,
};

export default QuestionsAuthor;