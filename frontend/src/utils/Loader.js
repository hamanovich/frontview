import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

const FontIcon = styled(FontAwesome)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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
        <FontIcon name="spinner" size="4x" pulse spin />
      ) : (
        <ComposedComponent {...this.props} {...myProps} />
      );
    }
  };
