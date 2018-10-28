import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import Badge from 'react-bootstrap/lib/Badge';

import Questions from './Questions';
import PaginationBar from '../layout/PaginationBar';

const QuestionsAll = ({ state, history }) => (
  <Fragment>
    <PageHeader>
      Questions
      <Badge>{state.pagination.count}</Badge>
    </PageHeader>

    <Questions />

    <PaginationBar
      activePage={state.pagination.activePage}
      pages={state.pagination.pages}
      onSelect={activePage =>
        state.pagination.activePage !== activePage && history.push(`/questions/page/${activePage}`)
      }
    />
  </Fragment>
);

const { shape, arrayOf, func, string, number } = PropTypes;

QuestionsAll.propTypes = {
  state: shape({
    pagination: shape({
      activePage: number,
      pages: number,
      count: number,
    }),
    tags: arrayOf(
      shape({
        _id: string,
        count: number,
      }),
    ),
  }).isRequired,
  history: shape({
    push: func,
  }).isRequired,
};

export default QuestionsAll;
