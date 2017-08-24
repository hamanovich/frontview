import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import QuestionsFull from './QuestionsFull';
import AddQuestionPage from '../addQuestion/AddQuestionPage';

import { User } from '../../utils/helpers';

const QuestionsPage = () => (
  <Switch>
    <Route exact path="/questions" component={QuestionsFull} />
    <Route path="/questions/page/:page" component={QuestionsFull} />
    <Route exact path="/questions/add" component={User(AddQuestionPage)} />
    <Route path="/questions/:_id/edit" component={User(AddQuestionPage)} />
    <Redirect to="/questions" />
  </Switch>
);

export default QuestionsPage;
