import React, { Fragment } from 'react';
import FontAwesome from 'react-fontawesome';

const QuestionsTabReact = () => (
  <Fragment>
    <h1>
      <a
        href="https://tylermcginnis.com/react-interview-questions/"
        target="_blank"
        rel="noopener noreferrer">
        <FontAwesome name="link" />
      </a>{' '}
      React Interview Questions
    </h1>

    <ul>
      <li>
        What happens when you call <strong>setState</strong>?
      </li>
      <li>
        What&apos;s the difference between an
        <strong>Element</strong> and a <strong>Component</strong> in React?
      </li>
      <li>
        When would you use a <strong>Class Component</strong> over a
        <strong>Functional Component</strong>?
      </li>
      <li>
        What are <strong>refs</strong> in React and why are they important?
      </li>
      <li>
        What are <strong>keys</strong> in React and why are they important?
      </li>
      <li>
        If you created a React element like <strong>Twitter</strong> below, what would the component
        definition of <strong>Twitter</strong> look like?
      </li>
      <li>
        What is the difference between a <strong>controlled</strong> component and an{' '}
        <strong>uncontrolled</strong> component?
      </li>
      <li>In which lifecycle event do you make AJAX requests and why?</li>
      <li>
        What does <strong>shouldComponentUpdate</strong> do and why is it important?
      </li>
      <li>
        How do you tell React to build in <strong>Production</strong> mode and what will that do?
      </li>
      <li>Describe how events are handled in React.</li>
      <li>
        What is the difference between <strong>createElement</strong> and{' '}
        <strong>cloneElement</strong>?
      </li>
      <li>
        What is the second argument that can optionally be passed to <strong>setState</strong> and
        what is its purpose?
      </li>
    </ul>
  </Fragment>
);

export default QuestionsTabReact;
