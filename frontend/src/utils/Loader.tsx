import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';

import IconLoader from '../components/shared/IconLoader';
import { LoaderState } from './models';

const withLoading = (prop: string) => <P extends object>(
  ComposedComponent: any,
) =>
  class Loader extends Component<any, LoaderState> {
    state: LoaderState = {
      isEmpty: false,
    };

    private mounted: boolean = false;
    private startTimer: number = 0;
    private endTimer: number = 0;

    componentDidMount() {
      this.mounted = true;
      this.startTimer = Date.now();

      setTimeout(() => {
        if (this.mounted && isEmpty(this.props[prop])) {
          this.setState({ isEmpty: true });
        }
      }, 5000);
    }

    componentWillUpdate(nextProps: any) {
      if (!isEmpty(nextProps[prop])) {
        this.endTimer = Date.now();
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const props = prop.split(' ');
      const filtered = props.filter(
        (propOne: string) => !isEmpty(this.props[propOne]),
      );
      const myProps = {
        loadingTime: ((this.endTimer - this.startTimer) / 1000).toFixed(2),
      };

      if (this.state.isEmpty) {
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
