import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const PricingPage = () => (
  <Fragment>
    <Container>
      <Helmet>
        <title>Frontview: &apos;Pricing&apos;</title>
      </Helmet>

      <div className="pb-4 mb-4 mx-auto text-center">
        <h1 className="display-4">&apos;Pricing&apos;</h1>
        <p className="lead">
          Feel the power of &apos;User&apos; and &apos;Hero&apos; plan. <br />
          <span className="text-danger">Newbie</span> player may only use read
          only mode: no adding new questions, no new features, no account page.{' '}
          <br />
          Anyway, it&apos;s up to you. All{' '}
          <span className="text-success">for free</span>
        </p>
      </div>
    </Container>

    <Container className="text-center">
      <CardDeck>
        <Card className="shadow-sm">
          <Card.Header>
            <h4 className="my-0">Newbie</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              $0 <small className="text-muted">/ year</small>
            </Card.Title>
            <ul className="list-unstyled">
              <li>Read only mode</li>
              <li>No adding question</li>
              <li>No account page</li>
              <li>*No Interview process</li>
            </ul>
            <Link to="/signup">
              <Button variant="outline-primary" size="lg">
                Sign up for free
              </Button>
            </Link>
          </Card.Body>
        </Card>
        <Card className="shadow-sm">
          <Card.Header>
            <h4 className="my-0">User</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              $0 <small className="text-muted">/ year</small>
            </Card.Title>
            <ul className="list-unstyled">
              <li>Adding question</li>
              <li>Account page</li>
              <li>Create question lists</li>
              <li>*Interview process</li>
            </ul>
            <Link to="/questions/add">
              <Button variant="primary" size="lg">
                Add new question
              </Button>
            </Link>
          </Card.Body>
        </Card>
        <Card className="shadow-sm">
          <Card.Header>
            <h4 className="my-0">Hero</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              $0 <small className="text-muted">/ year</small>
            </Card.Title>
            <ul className="list-unstyled">
              <li>As Registered</li>
              <li>Moderate questions</li>
              <li>Add multiple questions</li>
              <li>Hidden extra features</li>
            </ul>
            <Link to="/questions">
              <Button variant="success" size="lg">
                Verify questions
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </CardDeck>
      <p className="pt-4">
        To be a Hero just mail me to{' '}
        <a href="mailto:hamanovich@gmail.com">hamanovich@gmail.com</a>
      </p>
    </Container>
  </Fragment>
);

export default PricingPage;
