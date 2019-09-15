import React, { Fragment, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import MarkdownRenderer from 'react-markdown-renderer';
import FontAwesome from 'react-fontawesome';

import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

const enhance = compose(
  lifecycle({
    UNSAFE_componentWillMount() {
      const { history, location } = this.props as any;

      if (!location.state) {
        history.push('/');
      }
    },
  }),
);

const InterviewFinish: FunctionComponent<any> = ({ location }) => (
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

export default enhance(InterviewFinish);
