import React from 'react';

import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';

const HomePage = () => (
  <Jumbotron>
    <h1>Welcome here!</h1>
    <p className="lead">
      This is a simple hero unit, a simple Jumbotron-style component for calling extra attention
      to featured content or information.
    </p>
    <p className="lead">
      <Button bsStyle="primary" bsSize="lg">Learn More</Button>
    </p>
  </Jumbotron>
);

export default HomePage;
