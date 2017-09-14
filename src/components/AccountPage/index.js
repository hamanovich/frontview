import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Button from 'react-bootstrap/lib/Button';

import Account from './Account';
import AccountEdit from './AccountEdit';
import QListForm from './QListForm';

import { logout } from '../../actions/auth';

const AccountPage = ({ user, logout }) => (
  <Row>
    <Col md={3} sm={4}>
      <ListGroup style={{ marginTop: 45 }}>
        <Link to="/questions" className="list-group-item">
          <FontAwesome name="question-circle-o" /> All Questions
        </Link>
        <Link to={`/questions/author/${user.username}`} className="list-group-item">
          <FontAwesome name="copyright" /> Your Questions
        </Link>
        <Link to={`/comments/${user.username}`} className="list-group-item">
          <FontAwesome name="comments-o" /> Your Comments
        </Link>
        <Link to="/questions/add" className="list-group-item">
          <FontAwesome name="file-text-o" /> Add a question
        </Link>
        <Link to="/me/qlist/create" className="list-group-item">
          <FontAwesome name="list-ul" /> Create a QList
        </Link>
        <Button block bsStyle="danger" onClick={logout}>
          <FontAwesome name="sign-out" /> Logout
        </Button>
      </ListGroup>
    </Col>
    <Col md={9} sm={8}>
      <Switch>
        <Route exact path="/me" component={Account} />
        <Route exact path="/me/edit" component={AccountEdit} />
        <Route exact path="/me/qlist/create" component={QListForm} />
        <Redirect to="/me" />
      </Switch>
    </Col>
  </Row>
);

AccountPage.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, { logout })(AccountPage);