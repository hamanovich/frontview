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
        const include = allowed && allowed.includes(auth.user.role);

        if (!allowed && auth.isAuthenticated) {
          addFlashMessage({
            type: 'warn',
            text: 'You have already logged in. No need to do it again'
          });
          router.history.push('/');
        } else if (!auth.isAuthenticated && allowed) {
          addFlashMessage({
            type: 'error',
            text: 'To see this page you have to login. Please do it'
          });
          router.history.push('/login');
        } else if (auth.isAuthenticated && !include) {
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