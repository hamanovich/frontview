import React, { Fragment, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ScrollToTop from 'react-scroll-up';
import FontAwesome from 'react-fontawesome';

import Button from 'react-bootstrap/Button';

import HomePage from './HomePage';
import NotFound from './NotFound';
import Header from './layout/Header';
import Footer from './layout/Footer';
import FlashList from './flash/FlashList';
import FaqButton from './shared/FaqButton';

import { isLoggedIn, Customer, Admin, Waiting } from '../utils/helpers';
import ScrollToTopRoute from '../utils/ScrollToTopRoute';

const LoginPage = lazy(() =>
  import('./LoginPage' /* webpackChunkName: "Login" */),
);
const SignupPage = lazy(() =>
  import('./SignupPage' /* webpackChunkName: "Signup" */),
);
const UsersPage = lazy(() =>
  import('./UsersPage' /* webpackChunkName: "Users" */),
);
const AccountPage = lazy(() =>
  import('./AccountPage' /* webpackChunkName: "AccountPage" */),
);
const AboutPage = lazy(() =>
  import('./AboutPage' /* webpackChunkName: "AboutPage" */),
);
const InterviewPage = lazy(() =>
  import('./InterviewPage' /* webpackChunkName: "InterviewPage" */),
);
const QuestionsPage = lazy(() =>
  import('./QuestionsPage' /* webpackChunkName: "Questions" */),
);
const CommentsAuthorPage = lazy(() =>
  import(
    './Comment/CommentsAuthorPage' /* webpackChunkName: "CommentsAuthor" */
  ),
);
const CommentsNotVerifiedPage = lazy(() =>
  import(
    './Comment/CommentsNotVerifiedPage' /* webpackChunkName: "CommentsNotVerified" */
  ),
);
const ConfirmationPage = lazy(() =>
  import('./ConfirmationPage' /* webpackChunkName: "Confirmation" */),
);

const App = () => (
  <Fragment>
    <Helmet>
      <title>Frontview: Interview for Everyone</title>
    </Helmet>
    <Header />
    <main id="main">
      <ScrollToTopRoute />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={isLoggedIn(Waiting(LoginPage))} />
        <Route path="/signup" component={isLoggedIn(Waiting(SignupPage))} />
        <Route path="/me" component={Customer(Waiting(AccountPage))} />
        <Route path="/questions" component={Waiting(QuestionsPage)} />
        <Route path="/interview" component={Customer(Waiting(InterviewPage))} />
        <Route
          exact
          path="/comments/not-verified"
          component={Admin(Waiting(CommentsNotVerifiedPage))}
        />
        <Route exact path="/users" component={Admin(Waiting(UsersPage))} />
        <Route
          path="/comments/author/:username"
          component={Customer(Waiting(CommentsAuthorPage))}
        />
        <Route
          path="/confirmation/:token"
          component={Waiting(ConfirmationPage)}
        />
        <Route path="/about" component={Waiting(AboutPage)} />
        <Route component={NotFound} />
      </Switch>
    </main>
    <Footer />
    <FlashList />
    <FaqButton />
    <ScrollToTop showUnder={160} style={{ bottom: 16, right: 16, zIndex: 5 }}>
      <Button variant="warning">
        <FontAwesome name="chevron-up" />
      </Button>
    </ScrollToTop>
  </Fragment>
);

export default App;
