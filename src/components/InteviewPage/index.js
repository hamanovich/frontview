import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import InterviewHero from './InterviewHero';
import InterviewCandidates from './InterviewCandidates';
import InterviewQLists from './InterviewQLists';
import InterviewProgress from './InterviewProgress';
import InterviewFinish from './InterviewFinish';

import { candidateAdd, getCandidates, provideFeedback } from '../../actions/candidates';
import { addFlashMessage } from '../../actions/flash';
import { getQLists } from '../../actions/qlists';

import { PropsRoute } from '../../utils/helpers';

const InterviewPage = ({
  user,
  addFlashMessage,
  candidates,
  candidateAdd,
  getCandidates,
  provideFeedback,
  getQLists,
  qlists
}) => (
  <div>
    <PageHeader><FontAwesome name="id-badge" /> Interview</PageHeader>

    <Switch>
      <Route exact path="/interview" component={InterviewHero} />
      <PropsRoute
        exact
        path="/interview/candidates"
        component={InterviewCandidates}
        candidateAdd={candidateAdd}
        getCandidates={getCandidates}
        addFlashMessage={addFlashMessage}
        user={user}
        candidates={candidates}
      />
      <PropsRoute
        exact
        path="/interview/qlists"
        component={InterviewQLists}
        getQLists={getQLists}
        addFlashMessage={addFlashMessage}
        user={user}
        qlists={qlists}
      />
      <PropsRoute
        exact
        path="/interview/progress"
        component={InterviewProgress}
        addFlashMessage={addFlashMessage}
        provideFeedback={provideFeedback}
      />
      <PropsRoute
        exact
        path="/interview/finish"
        component={InterviewFinish}
      />
      <Redirect to="/interview" />
    </Switch>
  </div>
);

InterviewPage.propTypes = {
  candidateAdd: PropTypes.func.isRequired,
  getCandidates: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  getQLists: PropTypes.func.isRequired,
  provideFeedback: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    jobFunction: PropTypes.string,
    primarySkill: PropTypes.string,
    notes: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gravatar: PropTypes.string
  }).isRequired,
  candidates: PropTypes.array,
  qlists: PropTypes.array
};

InterviewPage.defaultProps = {
  candidates: [],
  qlists: []
};

const mapStateToProps = state => ({
  user: state.auth.user,
  candidates: state.candidates,
  qlists: state.qlists
});

export default connect(mapStateToProps, {
  candidateAdd,
  getCandidates,
  addFlashMessage,
  getQLists,
  provideFeedback
})(InterviewPage);