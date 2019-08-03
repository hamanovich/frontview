import React, { Fragment } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import FontAwesome from 'react-fontawesome';

import Container from 'react-bootstrap/Container';

import InterviewHero from './InterviewHero';
import InterviewCandidates from './InterviewCandidates';
import InterviewQLists from './InterviewQLists';
import InterviewProgress from './InterviewProgress';
import InterviewFinish from './InterviewFinish';

import {
  candidateAdd,
  getCandidates,
  provideFeedback,
} from '../../actions/candidates';
import { addFlashMessage } from '../../actions/flash';
import { getQLists } from '../../actions/qlists';

import { PropsRoute } from '../../utils/helpers';

const InterviewPage = ({
  auth,
  addFlashMessage,
  candidates,
  candidateAdd,
  getCandidates,
  provideFeedback,
  getQLists,
  qlists,
}) => (
  <Fragment>
    <Helmet>
      <title>Frontview: Interview</title>
    </Helmet>
    <Container>
      <h1>
        <FontAwesome name="id-badge" /> Interview
      </h1>

      <Switch>
        <Route exact path="/interview" component={InterviewHero} />

        <PropsRoute
          exact
          path="/interview/candidates"
          component={InterviewCandidates}
          candidateAdd={candidateAdd}
          getCandidates={getCandidates}
          addFlashMessage={addFlashMessage}
          userId={auth.user._id}
          candidates={candidates}
        />

        <PropsRoute
          exact
          path="/interview/qlists"
          component={InterviewQLists}
          getQLists={getQLists}
          addFlashMessage={addFlashMessage}
          userId={auth.user._id}
          qlists={qlists}
        />

        <PropsRoute
          exact
          path="/interview/progress"
          component={InterviewProgress}
          userId={auth.user._id}
          addFlashMessage={addFlashMessage}
          provideFeedback={provideFeedback}
        />

        <Route exact path="/interview/finish" component={InterviewFinish} />

        <Redirect to="/" />
      </Switch>
    </Container>
  </Fragment>
);

InterviewPage.defaultProps = {
  candidates: [],
  qlists: [],
};

const mapStateToProps = state => ({
  candidates: state.candidates,
  qlists: state.qlists,
});

export default connect(
  mapStateToProps,
  {
    candidateAdd,
    getCandidates,
    addFlashMessage,
    getQLists,
    provideFeedback,
  },
)(InterviewPage);
