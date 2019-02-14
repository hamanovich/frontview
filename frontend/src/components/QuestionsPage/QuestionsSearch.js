import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Questions from './Questions';

const QuestionsSearch = ({ location }) => (
  <Fragment>
    <h1>
      <FontAwesome name="search-plus" /> Search: &apos;
      {new URLSearchParams(location.search).get('q')}
      &apos;
    </h1>

    <Questions />
  </Fragment>
);

QuestionsSearch.propTypes = {
  location: shape({
    search: string,
  }).isRequired,
};

export default QuestionsSearch;
