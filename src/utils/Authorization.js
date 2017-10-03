import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addFlashMessage } from '../actions/flash';

import { UserType } from '../propTypes';

export default allowed =>
  (WrappedComponent) => {
    class Authorization extends Component {
      static propTypes = {
        auth: PropTypes.shape({
          user: UserType,
          isAuthenticated: PropTypes.bool
        }).isRequired,
        addFlashMessage: PropTypes.func.isRequired,
        history: PropTypes.shape({
          push: PropTypes.func.isRequired
        }).isRequired
      };

      componentWillMount() {
        const { addFlashMessage, auth, history } = this.props;
        const include = allowed && allowed.includes(auth.user.role);

        if (!allowed && auth.isAuthenticated) {
          addFlashMessage({
            type: 'warn',
            text: 'You have already logged in. No need to do it again'
          });

          history.push('/');
        } else if (!auth.isAuthenticated && allowed) {
          addFlashMessage({
            type: 'error',
            text: 'To see this page you have to login. Please do it'
          });

          history.push('/login');
        } else if (auth.isAuthenticated && !include) {
          addFlashMessage({
            type: 'error',
            text: 'You have no access to this page'
          });

          history.push('/');
        }
      }

      componentWillUpdate(nextProps) {
        if (!nextProps.auth.isAuthenticated) {
          this.props.history.push('/login');
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    const mapStateToProps = state => ({ auth: state.auth });

    return connect(mapStateToProps, { addFlashMessage })(Authorization);
  };