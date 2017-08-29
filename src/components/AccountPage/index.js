import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';

import Account from './Account';
import AccountEdit from './AccountEdit';

const AccountPage = () => (
  <Row>
    <Col md={3} sm={4}>
      <ListGroup style={{ marginTop: 45 }}>
        <Link to="/questions" className="list-group-item">Questions</Link>
        <Link to="/questions/add" className="list-group-item">Add question</Link>
      </ListGroup>
    </Col>
    <Col md={9} sm={8}>
      <Switch>
        <Route exact path="/me" component={Account} />
        <Route exact path="/me/edit" component={AccountEdit} />
        <Redirect to="/me" />
      </Switch>
    </Col>
  </Row>
);

export default AccountPage;