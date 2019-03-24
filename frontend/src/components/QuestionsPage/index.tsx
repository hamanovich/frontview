import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Container from 'react-bootstrap/Container';

import QuestionsAll from './QuestionsAll';
import QuestionsAuthor from './QuestionsAuthor';
import QuestionsTags from './QuestionsTags';
import QuestionsQList from './QuestionsQList';
import QuestionsSearch from './QuestionsSearch';
import QuestionOne from './QuestionOne';
import QuestionsWrapper from './QuestionsWrapper';

import { Customer, Waiting } from '../../utils/helpers';
import ErrorBoundary from '../../utils/ErrorBoundary';

const AddQuestion = lazy(() =>
  import('./AddQuestion' /* webpackChunkName: "AddQuestion" */),
);
const QuestionsTop = lazy(() =>
  import('./QuestionsTop' /* webpackChunkName: "QuestionsTop" */),
);
const QuestionsFromInternet = lazy(() =>
  import('./QuestionsFromInternet' /* webpackChunkName: "QuestionsFromInternet" */),
);

const QuestionsPage = () => (
  <Container>
    <Helmet>
      <title>Frontview: Questions</title>
    </Helmet>
    <ErrorBoundary>
      <Switch>
        <Route
          path="/questions/page/:page"
          component={QuestionsWrapper(QuestionsAll)}
        />
        <Route
          path="/questions/author/:username"
          component={Customer(QuestionsWrapper(QuestionsAuthor))}
        />
        <Route
          exact
          path="/questions/search"
          component={QuestionsWrapper(QuestionsSearch)}
        />
        <Route
          exact
          path="/questions/top"
          component={Waiting(QuestionsWrapper(QuestionsTop))}
        />
        <Route
          exact
          path="/questions/add"
          component={Customer(Waiting(AddQuestion))}
        />
        <Route
          path="/questions/internet/:source?"
          component={Waiting(QuestionsFromInternet)}
        />
        <Route
          exact
          path="/questions/:username/qlist/:slug"
          component={Customer(QuestionsWrapper(QuestionsQList))}
        />
        <Route
          exact
          path="/questions/:_id/edit"
          component={Customer(Waiting(AddQuestion))}
        />
        <Route exact path="/questions/:slug/one" component={QuestionOne} />
        <Route
          path="/questions/:filter/:tag?"
          component={Waiting(QuestionsTags)}
        />
        <Redirect to="/questions/page/1" />
      </Switch>
    </ErrorBoundary>
  </Container>
);

export default QuestionsPage;
