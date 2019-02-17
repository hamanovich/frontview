import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';

import IconLoader from '../components/shared/IconLoader';

export default prop => ComposedComponent =>
  class Loader extends Component {
    state = {
      isEmpty: false,
    };

    componentDidMount() {
      this.startTimer = Date.now();

      setTimeout(() => {
        if (isEmpty(this.props[prop])) {
          this.setState({ isEmpty: true });
        }
      }, 5000);
    }

    componentWillUpdate(nextProps) {
      if (!isEmpty(nextProps[prop])) {
        this.endTimer = Date.now();
      }
    }

    render() {
      const props = prop.split(' ');
      const filtered = props.filter(propOne => !isEmpty(this.props[propOne]));
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
        <ComposedComponent {...this.props} {...myProps} />
      );
    }
  };
