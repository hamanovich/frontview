import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Well from 'react-bootstrap/lib/Well';

const InterviewFinish = ({ location }) => (
  <div className="text-center">
    <h2>That&apos;s it</h2>
    <Well>{location.state}</Well>
    <p><Link to="/">Go to the home page</Link></p>
  </div>
);

InterviewFinish.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string.isRequired
  }).isRequired
};

export default InterviewFinish;