import React from 'react';
import { Link } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/lib/Jumbotron';

const HomePage = () => (
  <Jumbotron>
    <h1>Welcome, friend!</h1>
    <p className="lead">
      The goal of this project is to provide a convenient way to prepare and conduct technical
      interview in Frontend discipline.
    </p>
    <p className="lead">
      <Link to="/faq">Learn More</Link>
    </p>
  </Jumbotron>
);

export default HomePage;
