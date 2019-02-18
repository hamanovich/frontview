import React from 'react';
import { Link } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => (
  <footer className="bg-dark py-4 text-white">
    <Container>
      <Row className="text-center text-md-left">
        <Col md>
          <h4>Frontview /</h4>
          <small className="d-block mb-3">&copy; 2017-2019</small>
        </Col>
        <Col sm>
          <h5>Resources</h5>
          <ul className="list-unstyled">
            <li>
              <Link to="/interview" className="text-muted">
                *Interview (in dev)
              </Link>
            </li>
            <li>
              <Link to="/questions" className="text-muted">
                Questions
              </Link>
            </li>
            <li>
              <Link to="/questions/top" className="text-muted">
                Top 10
              </Link>
            </li>
            <li>
              <Link to="/questions/internet" className="text-muted">
                Internet
              </Link>
            </li>
          </ul>
        </Col>
        <Col sm>
          <h5>Features</h5>
          <ul className="list-unstyled">
            <li>
              <Link to="/about/pricing" className="text-muted">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/about/faq" className="text-muted">
                Help
              </Link>
            </li>
            <li>
              <Link to="/questions/add" className="text-muted">
                New Question
              </Link>
            </li>
          </ul>
        </Col>
        <Col sm>
          <h5>About</h5>
          <ul className="list-unstyled">
            <li>
              <Link to="/about" className="text-muted">
                Who Am I
              </Link>
            </li>
            <li>
              <Link to="/about/faq" className="text-muted">
                What For
              </Link>
            </li>
            <li>
              <Link to="/about/news" className="text-muted">
                Latest News
              </Link>
            </li>
            <li>
              <Link to="/about/links" className="text-muted">
                Useful links
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
    <p className="text-center">
      <a href="mailto:hamanovich@gmail.com">hamanovich@gmail.com</a> <br />
      <Badge variant="info">v1.0.0</Badge>
    </p>
  </footer>
);

export default Footer;
