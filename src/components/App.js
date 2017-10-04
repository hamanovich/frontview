import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Grid from 'react-bootstrap/lib/Grid';

import HomePage from './HomePage';
import NotFound from './NotFound';
import Header from './layout/Header';
import Footer from './layout/Footer';
import FlashList from './flash/FlashList';
import ConfirmationPage from './ConfirmationPage';
import InterviewPage from './InteviewPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AccountPage from './AccountPage';
import QuestionsPage from './QuestionsPage';
import CommentsAuthorPage from './Comment/CommentsAuthorPage';

import { isLoggedIn, User } from '../utils/helpers';

const Main = styled.main`
  padding-bottom: 30px;
`;

const App = () => (
  <div>
    <Header />
    <Grid>
      <FlashList />
      <Main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={isLoggedIn(LoginPage)} />
          <Route path="/signup" component={isLoggedIn(SignupPage)} />
          <Route path="/me" component={User(AccountPage)} />
          <Route path="/questions" component={User(QuestionsPage)} />
          <Route path="/interview" component={User(InterviewPage)} />
          <Route path="/comments/:username" component={User(CommentsAuthorPage)} />
          <Route path="/confirmation/:token" component={ConfirmationPage} />
          <Route component={NotFound} />
        </Switch>
      </Main>
    </Grid>
    <Footer />
  </div>
);

export default App;