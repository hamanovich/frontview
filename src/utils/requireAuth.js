import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addFlashMessage } from '../actions/flashMessages';

export default (ComposedComponent) => {
  class Authenticate extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      addFlashMessage: PropTypes.func.isRequired
    };

    static contextTypes = {
      router: PropTypes.object.isRequired
    };

    componentWillMount() {
      const { addFlashMessage, isAuthenticated } = this.props;

      if (!isAuthenticated) {
        addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        });

        this.context.router.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.history.push('/login');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
};
