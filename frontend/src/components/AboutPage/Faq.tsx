import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const FaqPage = () => (
  <Container>
    <Helmet>
      <title>Frontview: Frequently Asked Questions (FAQ)</title>
    </Helmet>

    <h1>
      <FontAwesome name="question-circle" /> Frequently Asked Questions (FAQ)
    </h1>

    <Card bg="primary" text="white">
      <Card.Header>
        <h4>What is Frontview?</h4>
      </Card.Header>
      <Card.Body>
        <p>
          Frontview - is a project to prepare and successfully pass technical
          interview on Frontend position. It has both practical and theoretical
          parts. In future interview flow will be available.
        </p>
      </Card.Body>
    </Card>
    <Card bg="success" text="white">
      <Card.Header>
        <h4>Why should I register?</h4>
      </Card.Header>
      <Card.Body>
        <p>
          To get full access for all features you have to be registered: Account
          Page, Adding/Modifing/Removing/Commenting questions, conducting
          interview.
        </p>
      </Card.Body>
    </Card>
    <Card bg="warning" text="white">
      <Card.Header>
        <h4>How to add a question?</h4>
      </Card.Header>
      <Card.Body>
        <p>
          Firstly login, and go to Menu -{' '}
          <Link to="/questions/add">Add new page.</Link>
        </p>
      </Card.Body>
    </Card>
    <Card bg="dark" text="white">
      <Card.Header>
        <h4>What is interview page?</h4>
      </Card.Header>
      <Card.Body>
        <p>
          In progress section. Description will be added once interview flow
          starts available for each registered and logedin users.
        </p>
      </Card.Body>
    </Card>
  </Container>
);

export default FaqPage;
