import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const InterviewHero = () => (
  <Jumbotron className="text-center">
    <h2 className="text-danger">
      This flow is in progress. <br />
      It doesn&apos;t work properly. <br />
      Please wait for next releases.
    </h2>
    <h3>Start your interview process right now</h3>

    <Link to="/interview/candidates">
      <Button variant="primary" size="lg" disabled>
        <FontAwesome name="angle-double-down" />
        &nbsp;Start&nbsp;
        <FontAwesome name="angle-double-down" />
      </Button>
    </Link>
  </Jumbotron>
);

export default InterviewHero;
