import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import QuestionsAll from './QuestionsAll';
import QuestionsTags from './QuestionsTags';
import AddQuestionPage from '../addQuestion/AddQuestionPage';

import { User } from '../../utils/helpers';

const QuestionsPage = () => (
  <Switch>
    <Route exact path="/questions" component={QuestionsAll} />
    <Route path="/questions/page/:page" component={QuestionsAll} />
    <Route exact path="/questions/add" component={User(AddQuestionPage)} />
    <Route path="/questions/:_id/edit" component={User(AddQuestionPage)} />
    <Route path="/questions/:filter/:tag" component={User(QuestionsTags)} />
    <Route path="/questions/:filter/" component={User(QuestionsTags)} />
    <Redirect to="/questions" />
  </Switch>
);

export default QuestionsPage;