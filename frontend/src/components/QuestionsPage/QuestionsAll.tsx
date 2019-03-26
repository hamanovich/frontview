import React, { FC, Fragment } from 'react';

import Badge from 'react-bootstrap/Badge';

import Questions from './Questions';
import PaginationBar from '../shared/PaginationBar';
import { QuestionsAllProps } from './models';

const QuestionsAll: FC<QuestionsAllProps> = ({ state, history }) => (
  <Fragment>
    <h1>
      Questions{' '}
      {state.pagination.count > 0 && (
        <Badge variant="primary">{state.pagination.count}</Badge>
      )}
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

export default QuestionsAll;
