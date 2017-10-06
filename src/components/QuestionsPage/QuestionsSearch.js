import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';

const QuestionsSearch = ({ location }) => (
  <div>
    <PageHeader>
      <FontAwesome name="search-plus" /> Search: &apos;{new URLSearchParams(location.search).get('q')}&apos;
  </PageHeader>

    <Questions />
  </div>
);

const { shape, string } = PropTypes;

QuestionsSearch.propTypes = {
  location: shape({
    search: string
  }).isRequired
};

export default QuestionsSearch;