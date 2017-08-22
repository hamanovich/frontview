import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addFlashMessage } from '../actions/flashMessages';

export default (allowed) =>
  (WrappedComponent) => {
    class Authorization extends Component {
      static propTypes = {
        auth: PropTypes.shape({
          user: PropTypes.object,
          isAuthenticated: PropTypes.bool.isRequired
        }).isRequired,
        addFlashMessage: PropTypes.func.isRequired
      };

      static contextTypes = {
        router: PropTypes.object.isRequired
      };

      componentWillMount() {
        const { addFlashMessage, auth } = this.props;
        const { router } = this.context;
        
        if (!auth.isAuthenticated) {
          addFlashMessage({
            type: 'error',
            text: 'To see this page you have to login. Please do it'
          });
          router.history.push('/login');
        } else if (allowed && !allowed.includes(auth.user.role)) {
          addFlashMessage({
            type: 'error',
            text: 'You have no access to this page'
          });
          router.history.push('/');
        }
      }

      componentWillUpdate(nextProps) {
        if (!nextProps.auth.isAuthenticated) {
          this.context.router.history.push('/login');
        }
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }

    const mapStateToProps = state => ({ auth: state.auth });

    return connect(mapStateToProps, { addFlashMessage })(Authorization);
  };