import React from 'react';
import FontAwesome from 'react-fontawesome';

import Jumbotron from 'react-bootstrap/lib/Jumbotron';

const NotFound = () => (
  <Jumbotron className="text-center">
    <h1>
      <FontAwesome name="exclamation-triangle" />
      <br />
      <span className="text-danger">404: not Found</span>
    </h1>
  </Jumbotron>
);

export default NotFound;
