import React, { Fragment } from 'react';
import { shape, arrayOf, func, string, number } from 'prop-types';

import Badge from 'react-bootstrap/Badge';

import Questions from './Questions';
import PaginationBar from '../shared/PaginationBar';

const QuestionsAll = ({ state, history }) => (
  <Fragment>
    <h1>
      Questions <Badge variant="primary">{state.pagination.count}</Badge>
    </h1>

    <Questions />

    {state.pagination.pages > 1 ? (
      <PaginationBar
        activePage={state.pagination.activePage}
        pages={state.pagination.pages}
        onSelect={activePage =>
          state.pagination.activePage !== activePage &&
          history.push(`/questions/page/${activePage}`)
        }
      />
    ) : null}
  </Fragment>
);

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
