import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

export default prop => (ComposedComponent) => {
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
      const myProps = {
        loadingTime: ((this.endTimer - this.startTimer) / 1000).toFixed(2)
      };

      return isEmpty(this.props[prop]) ? <div className="loader" /> : <ComposedComponent {...this.props} {...myProps} />;
    }
  }

  return Loader;
};
