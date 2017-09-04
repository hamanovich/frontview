import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';

import Account from './Account';
import AccountEdit from './AccountEdit';

const AccountPage = ({ user }) => (
  <Row>
    <Col md={3} sm={4}>
      <ListGroup style={{ marginTop: 45 }}>
        <Link to="/questions" className="list-group-item">
          <FontAwesome name="question-circle-o" /> All Questions
        </Link>
        <Link to={`/questions/author/${user.username}`} className="list-group-item">
          <FontAwesome name="copyright" /> Your Questions
        </Link>
        <Link to="/questions/add" className="list-group-item">
          <FontAwesome name="file-text-o" /> Add question
        </Link>
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

AccountPage.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps)(AccountPage);