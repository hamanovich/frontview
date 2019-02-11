import React from 'react';
import { shape, bool } from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
    <Helmet>
      <title>Frontview: {auth.user.username}</title>
    </Helmet>
    <Col md={3} sm={4}>
      <AccountBar auth={auth} />
    </Col>
    <Col md={9} sm={8}>
      <Switch>
        <PropsRoute exact path="/me" component={Account} user={auth.user} />
        <PropsRoute exact path="/me/edit" component={AccountEdit} user={auth.user} />
        <PropsRoute exact path="/me/qlist/create" component={QListPage} userId={auth.user._id} />
        <PropsRoute exact path="/me/qlists" component={QLists} userId={auth.user._id} />
        <Redirect to="/" />
      </Switch>
    </Col>
  </Row>
);

AccountPage.propTypes = {
  auth: shape({
    isAuthenticated: bool.isRequired,
    user: UserType.isRequired,
  }).isRequired,
};

export default AccountPage;
