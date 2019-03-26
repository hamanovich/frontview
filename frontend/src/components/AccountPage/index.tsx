import React, { FC } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Account from './Account';
import AccountEdit from './AccountEdit';
import AccountBar from './AccountBar';
import QListPage from '../QList/QListPage';
import QLists from '../QList/QLists';

import { PropsRoute } from '../../utils/helpers';
import { AccountPageProps } from './models';

const AccountPage: FC<AccountPageProps> = ({ auth }) => (
  <Container>
    <Helmet>
      <title>Frontview: Profile</title>
    </Helmet>
    <Row>
      <Col xl={9} md={{ span: 8, order: 1 }} className="mb-4">
        <Switch>
          <PropsRoute exact path="/me" component={Account} user={auth.user} />
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
            username={auth.user.username}
          />
          <Redirect to="/" />
        </Switch>
      </Col>
      <Col xl={3} md={4}>
        <AccountBar auth={auth} />
      </Col>
    </Row>
  </Container>
);

export default AccountPage;
