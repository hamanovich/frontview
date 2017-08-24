import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Grid from 'react-bootstrap/lib/Grid';

import Greeting from './layout/Greeting';
import NotFound from './layout/NotFound';
import LoginPage from './login/LoginPage';
import ForgotPage from './forgot/ForgotPage';
import ResetPage from './reset/ResetPage';
import SignupPage from './signup/SignupPage';
import AccountPage from './account/AccountPage';
import AddQuestionPage from './addQuestion/AddQuestionPage';
import QuestionPage from './questions/QuestionPage';
import NavbarMenu from './layout/NavbarMenu';
import Footer from './layout/Footer';
import FlashList from './flash/FlashList';

import { User } from '../utils/helpers';

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
              <Route path="/login" component={LoginPage} />
              <Route path="/forgot" component={ForgotPage} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/me" component={User(AccountPage)} />
              <Route exact path="/questions" component={QuestionPage} />
              <Route path="/questions/page/:page" component={QuestionPage} />
              <Route exact path="/questions/add" component={User(AddQuestionPage)} />
              <Route path="/question/:_id/edit" component={User(AddQuestionPage)} />
              <Route path="/reset/:token" component={ResetPage} />
              <Route path="*" name="not-found" component={NotFound} />
            </Switch>
          </main>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default App;
