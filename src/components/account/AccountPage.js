import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';

import Account from './Account';
import AccountEdit from './AccountEdit';

const AccountPage = () => (
  <Row>
    <Col md={3} sm={4}>
      <ListGroup style={{ marginTop: 25 }}>
        <Link to="/questions" className="list-group-item">Questions</Link>
        <Link to="/add-question" className="list-group-item">Add question</Link>
        <Button block bsStyle="danger">Logout</Button>
      </ListGroup>
    </Col>
    <Col md={9} sm={8}>
      <Switch>
        <Route exact path='/account' component={Account} />
        <Route path='/account/edit' component={AccountEdit} />
      </Switch>
    </Col>
  </Row>
)

export default AccountPage;
