import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const HomePage = () => (
  <Fragment>
    <Jumbotron>
      <Container>
        <h1 className="display-3">Welcome, friend!</h1>
        <p className="lead">
          The goal of this project is to provide a convenient way to prepare and conduct technical
          interview in Frontend discipline.
        </p>
        <p className="lead">
          You also able to add newquestions, comment existing and review them. Check it on{' '}
          <Link to="pricing">features</Link> page.
        </p>
        <p>
          <em>*This is only beginning</em>
        </p>
        <p>
          <Link to="/about/faq">
            <Button variant="primary" size="lg">
              Learn More <FontAwesome name="angle-double-right" />
            </Button>
          </Link>
        </p>
      </Container>
    </Jumbotron>
    <Container className="py-5">
      <Row>
        <Col md={4}>
          <h2>
            Be Prepared <FontAwesome name="line-chart" />
          </h2>
          <p>
            You have upcoming technical interview in frontend discipline? You are looking for the
            space where to restore your knowledge? Want to code practice or deep dive into theory?
            Woala! Welcome, friend.
          </p>
          <p>
            <Link to="/about/faq">
              <Button variant="outline-success">
                Learn More <FontAwesome name="angle-double-right" />
              </Button>
            </Link>
          </p>
        </Col>
        <Col md={4}>
          <h2>
            Be Involved <FontAwesome name="flash" />
          </h2>
          <p>
            Want to share tricky question? Do you have a puzzle for front-end guys? Do you have
            zillion interviews and have something to share? Welcome, friend.
          </p>
          <p>
            <Link to="/about/faq">
              <Button variant="outline-primary">
                Learn More <FontAwesome name="angle-double-right" />
              </Button>
            </Link>
          </p>
        </Col>
        <Col md={4}>
          <h2>
            Frontend Hero <FontAwesome name="rocket" />
          </h2>
          <p>
            Glad to see you! Welcome on board, contact me directly{' '}
            <a href="mailto:hamanovich@gmail.com">hamanovich@gmail.com</a> and we will find an
            opportunity for you as well.
          </p>
          <p>
            <Link to="/about/faq">
              <Button variant="outline-danger">
                Learn More <FontAwesome name="angle-double-right" />
              </Button>
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  </Fragment>
);

export default HomePage;
