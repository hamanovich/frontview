import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Button from 'react-bootstrap/lib/Button';

import Account from './Account';
import AccountEdit from './AccountEdit';
import QListPage from '../QList/QListPage';
import QLists from '../QList/QLists';

import { logout } from '../../actions/auth';

import { UserType } from '../../propTypes';

const List = styled(ListGroup) `
  margin-top: 45px;
`;

const AccountPage = ({ user, logout }) => (
  <Row>
    <Col md={3} sm={4}>
      <List>
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
        <Link to="/me/qlists" className="list-group-item">
          <FontAwesome name="list-ol" /> Show my QLists
        </Link>
        <Button block bsStyle="danger" onClick={logout}>
          <FontAwesome name="sign-out" /> Logout
        </Button>
      </List>
    </Col>
    <Col md={9} sm={8}>
      <Switch>
        <Route exact path="/me" component={Account} />
        <Route exact path="/me/edit" component={AccountEdit} />
        <Route exact path="/me/qlist/create" component={QListPage} />
        <Route exact path="/me/qlists" component={QLists} />
        <Redirect to="/me" />
      </Switch>
    </Col>
  </Row>
);

AccountPage.propTypes = {
  user: UserType.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, { logout })(AccountPage);