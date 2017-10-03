import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Account from './Account';
import AccountEdit from './AccountEdit';
import AccountBar from './AccountBar';
import QListPage from '../QList/QListPage';
import QLists from '../QList/QLists';

import { PropsRoute } from '../../utils/helpers';

import { UserType } from '../../propTypes';

const AccountPage = ({ auth }) => (
  <Row>
    <Col md={3} sm={4}>
      <AccountBar auth={auth} />
    </Col>
    <Col md={9} sm={8}>
      <Switch>
        <PropsRoute
          exact
          path="/me"
          component={Account}
          user={auth.user}
        />

        <PropsRoute
          exact
          path="/me/edit"
          component={AccountEdit}
          user={auth.user}
        />

        <PropsRoute
          exact
          path="/me/qlist/create"
          component={QListPage}
          userId={auth.user._id}
        />

        <PropsRoute
          exact
          path="/me/qlists"
          component={QLists}
          userId={auth.user._id}
        />

        <Redirect to="/me" />
      </Switch>
    </Col>
  </Row>
);

AccountPage.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: UserType.isRequired
  }).isRequired
};

export default AccountPage;