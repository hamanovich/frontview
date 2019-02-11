import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';

const InterviewHero = () => (
  <Jumbotron className="text-center">
    <h2 className="text-danger">
      This flow is in progress. <br />
      It doesn&apos;t work properly. <br />
      Please wait for next releases.
    </h2>
    <h3>Start your interview process right now</h3>

    <Link to="/interview/candidates">
      <Button bsStyle="primary" bsSize="large" disabled>
        <FontAwesome name="angle-double-down" />
        &nbsp;Start&nbsp;
        <FontAwesome name="angle-double-down" />
      </Button>
    </Link>
  </Jumbotron>
);

export default InterviewHero;
