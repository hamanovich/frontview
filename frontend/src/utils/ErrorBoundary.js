import React, { Component } from 'react';
import { element } from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

class ErrorBoundary extends Component {
  static propTypes = {
    children: element.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Jumbotron className="text-center">
          <h1 className="display-3">
            <FontAwesome name="exclamation-triangle" />
            <br />
            Something went wrong!
          </h1>
          <a href="mailto:hamanovich@gmail.com">
            <Button variant="danger" size="lg">
              Please contact admin
            </Button>
          </a>
          <br />
          or
          <br />
          Open issue on{' '}
          <a
            href="https://github.com/hamanovich/frontview/issues"
            target="_blank"
            rel="noopener noreferrer">
            Github page
          </a>
          .
        </Jumbotron>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
