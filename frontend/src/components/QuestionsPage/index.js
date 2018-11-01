import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import QuestionsAll from './QuestionsAll';
import QuestionsAuthor from './QuestionsAuthor';
import QuestionsTop from './QuestionsTop';
import QuestionsTags from './QuestionsTags';
import QuestionsQList from './QuestionsQList';
import QuestionsSearch from './QuestionsSearch';
import QuestionsFromInternet from './QuestionsFromInternet';
import AddQuestion from './AddQuestion';
import QuestionOne from './QuestionOne';
import QuestionsWrapper from './QuestionsWrapper';

const QuestionsPage = () => (
  <Switch>
    <Route path="/questions/page/:page" component={QuestionsWrapper(QuestionsAll)} />
    <Route path="/questions/author/:username" component={QuestionsWrapper(QuestionsAuthor)} />
    <Route exact path="/questions/search" component={QuestionsWrapper(QuestionsSearch)} />
    <Route exact path="/questions/top" component={QuestionsWrapper(QuestionsTop)} />
    <Route exact path="/questions/add" component={AddQuestion} />
    <Route path="/questions/internet/:source?" component={QuestionsFromInternet} />
    <Route path="/questions/qlist/:slug" component={QuestionsWrapper(QuestionsQList)} />
    <Route path="/questions/:_id/edit" component={AddQuestion} />
    <Route path="/questions/:slug/one" component={QuestionOne} />
    <Route
      path="/questions/:filter/:tag?"
      component={props => <QuestionsTags timestamp={new Date().toString()} {...props} />}
    />
    <Redirect to="/questions/page/1" />
  </Switch>
);

export default QuestionsPage;