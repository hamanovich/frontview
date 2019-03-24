import React, { Component, ReactNode } from 'react';
import FontAwesome from 'react-fontawesome';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

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
