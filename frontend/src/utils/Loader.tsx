import React, { Component, Fragment } from 'react';

import IconLoader from '../components/shared/IconLoader';
import { LoaderState } from './models';

const withLoading = (prop: string) => <P extends object>(
  ComposedComponent: any,
) =>
  class Loader extends Component<any, LoaderState> {
    state: LoaderState = {
      isEmpty: false,
      nothingFound: false,
      timeout: 5000,
    };

    private mounted = false;

    private startTimer = 0;

    private endTimer = 0;

    componentDidMount() {
      this.mounted = true;
      this.startTimer = Date.now();

      setTimeout(() => {
        if (this.mounted) {
          if (
            Array.isArray(this.props[prop]) &&
            this.props[prop].length === 0
          ) {
            this.setState({ nothingFound: true });
          }

          if (this.props[prop] && Object.keys(this.props[prop]).length === 0) {
            this.setState({ isEmpty: true });
          }
        }
      }, this.state.timeout);
    }

    UNSAFE_componentWillUpdate(nextProps: any) {
      if (nextProps[prop] && Object.keys(nextProps[prop]).length !== 0) {
        this.endTimer = Date.now();
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const { nothingFound, isEmpty } = this.state;
      const props = prop.split(' ');
      const filtered = props.filter(
        (propOne: string) =>
          this.props[propOne] && Object.keys(this.props[propOne]).length !== 0,
      );
      const myProps = {
        loadingTime: ((this.endTimer - this.startTimer) / 1000).toFixed(2),
      };

      if (nothingFound) {
        return (
          <Fragment>
            <h2 className="text-danger">
              We spent <strong>5</strong> seconds and nothing found
            </h2>
            <p>
              It may happen due to no data fetched by this request or some
              server issue. If you are sure this page/request should return any
              specific data, but it didn&apos;t, please{' '}
              <a href="mailto:hamanovich@gmail.com">contact admin</a> or create
              a ticket in{' '}
              <a
                href="https://github.com/hamanovich/frontview/issues"
                target="_blank"
                rel="noopener noreferrer">
                Github page
              </a>
            </p>
          </Fragment>
        );
      }

      if (isEmpty) {
        return (
          <Fragment>
            <h2 className="text-danger">
              After <strong>5</strong> seconds nothing found
            </h2>
            <p>Please specify your query or try again.</p>
          </Fragment>
        );
      }

      return filtered.length !== props.length ? (
        <IconLoader />
      ) : (
        <ComposedComponent {...(this.props as P)} {...myProps} />
      );
    }
  };

export default withLoading;
