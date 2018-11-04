import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';

const InterviewHero = () => (
  <Jumbotron className="text-center">
    <h2>Start your interview process right now</h2>

    <Link to="/interview/candidates">
      <Button bsStyle="primary" bsSize="large" block>
        <FontAwesome name="angle-double-down" /> Start
        <FontAwesome name="angle-double-down" />
      </Button>
    </Link>
  </Jumbotron>
);

export default InterviewHero;
