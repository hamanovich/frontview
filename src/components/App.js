import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Grid from 'react-bootstrap/lib/Grid';

import Greeting from './layout/Greeting';
import NotFound from './layout/NotFound';
import LoginPage from './login/LoginPage';
import SignupPage from './signup/SignupPage';
import AccountPage from './account/AccountPage';
import QuestionsPage from './questions/QuestionsPage';
import NavbarMenu from './layout/NavbarMenu';
import Footer from './layout/Footer';
import FlashList from './flash/FlashList';

import { isLoggedIn, User } from '../utils/helpers';

class App extends Component {
  render() {
    return (
      <div>
        <NavbarMenu />
        <Grid>
          <FlashList />
          <main>
            <Switch>
              <Route exact path="/" component={Greeting} />
              <Route path="/login" component={isLoggedIn(LoginPage)} />
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
  }
}

export default App;
