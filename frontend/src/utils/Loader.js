import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

import IconLoader from '../components/shared/IconLoader';

export default prop => ComposedComponent =>
  class Loader extends Component {
    componentDidMount() {
      this.startTimer = Date.now();
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

      return filtered.length !== props.length ? (
        <IconLoader />
      ) : (
        <ComposedComponent {...this.props} {...myProps} />
      );
    }
  };
