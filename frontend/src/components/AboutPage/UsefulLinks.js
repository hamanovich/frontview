import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import FontAwesome from 'react-fontawesome';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

const UsefulLinks = () => (
  <Fragment>
    <Helmet>
      <title>Frontview: Useful Links</title>
    </Helmet>
    <Container>
      <h1>
        <FontAwesome name="external-link" /> Useful external Links
      </h1>
      <ListGroup variant="flush">
        <ListGroup.Item
          action
          href="http://thatjsdude.com/interview/"
          target="_blank"
          rel="noopener noreferrer">
          <h5 className="my-0">Interview Questions for front-end-Developer</h5>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="https://github.com/yangshun/front-end-interview-handbook"
          target="_blank"
          rel="noopener noreferrer">
          <h5 className="my-0">Front-end Job Interview Handbook</h5>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="https://30secondsofinterviews.org/"
          target="_blank"
          rel="noopener noreferrer">
          <h5 className="my-0">30 seconds of interviews</h5>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="https://github.com/MaximAbramchuck/awesome-interview-questions"
          target="_blank"
          rel="noopener noreferrer">
          <h5 className="my-0">Awesome Interviews</h5>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="https://github.com/khan4019/front-end-Interview-Questions"
          target="_blank"
          rel="noopener noreferrer">
          <h5 className="my-0">Front end Interview Questions</h5>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="https://scottaohara.github.io/accessibility_interview_questions/"
          target="_blank"
          rel="noopener noreferrer">
          <h5 className="my-0">Accessibility Interview Questions</h5>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="https://github.com/vvscode/js--interview-questions"
          target="_blank"
          rel="noopener noreferrer">
          <h5 className="my-0">Notes from technical (javascript) interviews</h5>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  </Fragment>
);

export default UsefulLinks;
