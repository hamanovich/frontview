import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MarkdownRenderer from 'react-markdown-renderer';
import FontAwesome from 'react-fontawesome';

import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

import Well from 'react-bootstrap/lib/Well';

import { CandidateType } from '../../propTypes';

const enhance = compose(
  lifecycle({
    componentWillMount() {
      const { history, location } = this.props;

      if (!location.state) {
        history.push('/');
      }
    }
  })
);

const InterviewFinish = ({ location }) => (
  <div>
    {location.state && <div>
      <h2>Feedback on {location.state.candidate.firstName} {location.state.candidate.lastName}:</h2>
      <Well className="text-left">
        <MarkdownRenderer markdown={location.state.feedback.result} />
      </Well>
      <p><Link to="/"><FontAwesome name="home" /> Go to the home page</Link></p>
    </div>}
  </div>
);

InterviewFinish.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      candidate: CandidateType,
      feedback: PropTypes.shape({
        result: PropTypes.string
      })
    })
  }).isRequired
};

export default enhance(InterviewFinish);