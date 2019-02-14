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

import { User, Waiting } from '../../utils/helpers';

const AddQuestion = lazy(() => import('./AddQuestion' /* webpackChunkName: "AddQuestion" */));
const QuestionsTop = lazy(() => import('./QuestionsTop' /* webpackChunkName: "QuestionsTop" */));
const QuestionsFromInternet = lazy(() =>
  import('./QuestionsFromInternet' /* webpackChunkName: "QuestionsFromInternet" */),
);

const QuestionsPage = () => (
  <Container>
    <Helmet>
      <title>Frontview: Questions</title>
    </Helmet>
    <Switch>
      <Route path="/questions/page/:page" component={QuestionsWrapper(QuestionsAll)} />
      <Route
        path="/questions/author/:username"
        component={User(QuestionsWrapper(QuestionsAuthor))}
      />
      <Route exact path="/questions/search" component={QuestionsWrapper(QuestionsSearch)} />
      <Route exact path="/questions/top" component={Waiting(QuestionsWrapper(QuestionsTop))} />
      <Route exact path="/questions/add" component={User(Waiting(AddQuestion))} />
      <Route path="/questions/internet/:source?" component={Waiting(QuestionsFromInternet)} />
      <Route path="/questions/qlist/:slug" component={User(QuestionsWrapper(QuestionsQList))} />
      <Route path="/questions/:_id/edit" component={User(Waiting(AddQuestion))} />
      <Route path="/questions/:slug/one" component={QuestionOne} />
      <Route
        path="/questions/:filter/:tag?"
        component={props => <QuestionsTags timestamp={new Date().toString()} {...props} />}
      />
      <Redirect to="/questions/page/1" />
    </Switch>
  </Container>
);

export default QuestionsPage;
