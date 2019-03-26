import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const NotFound = () => (
  <Jumbotron className="text-center text-danger">
    <h1 className="display-3">
      <FontAwesome name="exclamation-triangle" />
      <br />
      404: not Found
    </h1>
    <Link to="/">
      <Button variant="success" size="lg">
        Return to home page
      </Button>
    </Link>
  </Jumbotron>
);

export default NotFound;
