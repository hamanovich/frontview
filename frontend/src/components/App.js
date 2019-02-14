import React, { Fragment, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import HomePage from './HomePage';
import NotFound from './NotFound';
import Header from './layout/Header';
import Footer from './layout/Footer';
import FlashList from './flash/FlashList';
import FaqButton from './shared/FaqButton';

import { isLoggedIn, User, Waiting } from '../utils/helpers';

const LoginPage = lazy(() => import('./LoginPage' /* webpackChunkName: "Login" */));
const SignupPage = lazy(() => import('./SignupPage' /* webpackChunkName: "Signup" */));
const AccountPage = lazy(() => import('./AccountPage' /* webpackChunkName: "AccountPage" */));
const InterviewPage = lazy(() => import('./InterviewPage' /* webpackChunkName: "InterviewPage" */));
const QuestionsPage = lazy(() => import('./QuestionsPage' /* webpackChunkName: "Questions" */));
const CommentsAuthorPage = lazy(() =>
  import('./Comment/CommentsAuthorPage' /* webpackChunkName: "CommentsAuthor" */),
);
const ConfirmationPage = lazy(() =>
  import('./ConfirmationPage' /* webpackChunkName: "Confirmation" */),
);
const FaqPage = lazy(() => import('./FaqPage' /* webpackChunkName: "FAQ" */));

const App = () => (
  <Fragment>
    <Helmet>
      <title>Frontview: Interview for Everyone</title>
    </Helmet>
    <Header />
    <main id="main">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={isLoggedIn(Waiting(LoginPage))} />
        <Route path="/signup" component={isLoggedIn(Waiting(SignupPage))} />
        <Route path="/me" component={User(Waiting(AccountPage))} />
        <Route path="/questions" component={Waiting(QuestionsPage)} />
        <Route path="/interview" component={User(Waiting(InterviewPage))} />
        <Route path="/comments/:username" component={User(Waiting(CommentsAuthorPage))} />
        <Route path="/confirmation/:token" component={Waiting(ConfirmationPage)} />
        <Route path="/faq" component={Waiting(FaqPage)} />
        <Route component={NotFound} />
      </Switch>
    </main>
    <Footer />
    <FlashList />
    <FaqButton />
  </Fragment>
);

export default App;
