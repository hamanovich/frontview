import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import MarkdownRenderer from 'react-markdown-renderer';
import FontAwesome from 'react-fontawesome';

import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

import { CandidateType } from '../../propTypes';

const enhance = compose(
  lifecycle({
    componentWillMount() {
      const { history, location } = this.props;

      if (!location.state) {
        history.push('/');
      }
    },
  }),
);

const InterviewFinish = ({ location }) => (
  <Fragment>
    {location.state && (
      <div>
        <h2>
          Feedback on
          {location.state.candidate.firstName}{' '}
          {location.state.candidate.lastName}:
        </h2>
        <MarkdownRenderer markdown={location.state.feedback.result} />
        <p>
          <Link to="/">
            <FontAwesome name="home" /> Go to the home page
          </Link>
        </p>
      </div>
    )}
  </Fragment>
);

InterviewFinish.propTypes = {
  location: shape({
    state: shape({
      candidate: CandidateType,
      feedback: shape({
        result: string,
      }),
    }),
  }).isRequired,
};

export default enhance(InterviewFinish);
