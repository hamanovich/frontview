import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';

const QuestionsAuthor = ({ auth }) => (
  <div>
    <PageHeader>
      <FontAwesome name="file-text-o" /> {auth.user.username}&apos;s Questions
    </PageHeader>

    <Questions />
  </div>
);

const { shape, string } = PropTypes;

QuestionsAuthor.propTypes = {
  auth: shape({
    user: shape({
      username: string
    })
  }).isRequired
};

export default QuestionsAuthor;