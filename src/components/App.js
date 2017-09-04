import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Grid from 'react-bootstrap/lib/Grid';

import HomePage from './HomePage';
import NotFound from './NotFound';
import Header from './layout/Header';
import Footer from './layout/Footer';
import FlashList from './flash/FlashList';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AccountPage from './AccountPage';
import QuestionsPage from './QuestionsPage';

import { isLoggedIn, User } from '../utils/helpers';

const App = () => (
  <div>
    <Header />
    <Grid>
      <FlashList />
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={isLoggedIn(SignupPage)} />
          <Route path="/me" component={User(AccountPage)} />
          <Route path="/questions" component={QuestionsPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </Grid>
    <Footer />
  </div>
);

export default App;