import React, { Fragment } from 'react';
import FontAwesome from 'react-fontawesome';

const QuestionsTabNodeJS = () => (
  <Fragment>
    <h1>
      <a
        href="https://blog.risingstack.com/node-js-interview-questions-and-answers-2017/"
        target="_blank"
        rel="noopener noreferrer">
        <FontAwesome name="link" />
      </a>{' '}
      Node.js Interview Questions and Answers (2017 Edition)
    </h1>

    <h3>Node.js Interview Questions for 2017</h3>

    <ul>
      <li>What is an error-first callback?</li>
      <li>How can you avoid callback hells?</li>
      <li>What are Promises?</li>
      <li>What tools can be used to assure consistent style? Why is it important?</li>
      <li>When should you npm and when yarn?</li>
      <li>What&apos;s a stub? Name a use case!</li>
      <li>What&apos;s a test pyramid? Give an example!</li>
      <li>What&apos;s your favorite HTTP framework and why?</li>
      <li>How can you secure your HTTP cookies against XSS attacks?</li>
      <li>How can you make sure your dependencies are safe?</li>
    </ul>
  </Fragment>
);

export default QuestionsTabNodeJS;
