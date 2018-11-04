import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import Questions from './Questions';

const QuestionsSearch = ({ location }) => (
  <Fragment>
    <PageHeader>
      <FontAwesome name="search-plus" /> Search: &apos;
      {new URLSearchParams(location.search).get('q')}
      &apos;
    </PageHeader>

    <Questions />
  </Fragment>
);

QuestionsSearch.propTypes = {
  location: shape({
    search: string,
  }).isRequired,
};

export default QuestionsSearch;
