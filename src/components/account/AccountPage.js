import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';

import Account from './Account';
import AccountEdit from './AccountEdit';

import { logout } from '../../actions/auth';

class AccountPage extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    const { logout } = this.props;

    return (
      <Row>
        <Col md={3} sm={4}>
          <ListGroup style={{ marginTop: 25 }}>
            <Link to="/questions" className="list-group-item">Questions</Link>
            <Link to="/add-question" className="list-group-item">Add question</Link>
            <Button block bsStyle="danger" onClick={logout}>Logout</Button>
          </ListGroup>
        </Col>
        <Col md={9} sm={8}>
          <Switch>
            <Route exact path='/me' component={Account} />
            <Route path='/me/edit' component={AccountEdit} />
          </Switch>
        </Col>
      </Row>
    );
  }
}

export default connect(null, { logout })(AccountPage);
