import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addFlashMessage } from '../actions/flash';
import { AuthorizationProps } from './models';
import { Auth } from '../propTypes/UserType';

const withAuthorization = (allowed?: string[]) => <P extends object>(
  WrappedComponent: any,
) => {
  class Authorization extends Component<AuthorizationProps> {
    UNSAFE_componentWillMount() {
      const { addFlashMessage, auth, history } = this.props;
      const include = allowed && allowed.includes(auth.user.role);

      if (!allowed && auth.isAuthenticated) {
        addFlashMessage({
          type: 'warn',
          text: 'You have already logged in',
        });

        history.push('/');
      } else if (!auth.isAuthenticated && allowed) {
        addFlashMessage({
          type: 'error',
          text: 'To see this page you have to be logged in',
        });

        history.push('/login');
      } else if (auth.isAuthenticated && !include) {
        addFlashMessage({
          type: 'error',
          text: 'You have no access to this page',
        });

        history.push('/');
      }
    }

    UNSAFE_componentWillUpdate(nextProps: any) {
      if (!nextProps.auth.isAuthenticated && nextProps.match.url !== '/login') {
        this.props.history.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...(this.props as P)} />;
    }
  }

  const mapStateToProps = (state: { auth: Auth }) => ({ auth: state.auth });

  return connect(
    mapStateToProps,
    { addFlashMessage },
  )(Authorization);
};

export default withAuthorization;
