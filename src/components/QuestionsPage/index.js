import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import QuestionsAll from './QuestionsAll';
import QuestionsTags from './QuestionsTags';
import AddQuestion from './AddQuestion';

import { User } from '../../utils/helpers';

const QuestionsPage = () => (
  <Switch>
    <Route exact path="/questions" component={QuestionsAll} />
    <Route path="/questions/page/:page" component={QuestionsAll} />
    <Route exact path="/questions/add" component={User(AddQuestion)} />
    <Route path="/questions/:_id/edit" component={User(AddQuestion)} />
    <Route path="/questions/:filter/:tag?" component={User(QuestionsTags)} />
    <Redirect to="/questions" />
  </Switch>
);

export default QuestionsPage;