import React from 'react';
import { func, shape, bool } from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { logout } from '../../actions/auth';

import { UserType } from '../../propTypes';

const AccountBar = ({ auth, logout }) => (
  <ListGroup>
    <Link to="/questions" className="list-group-item">
      <FontAwesome name="question-circle-o" /> All Questions
    </Link>
    <Link to={`/questions/author/${auth.user.username}`} className="list-group-item">
      <FontAwesome name="copyright" /> Your Questions
    </Link>
    <Link to={`/comments/${auth.user.username}`} className="list-group-item">
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
    <Button block variant="danger" onClick={logout}>
      <FontAwesome name="sign-out" /> Logout
    </Button>
  </ListGroup>
);

AccountBar.propTypes = {
  auth: shape({
    isAuthenticated: bool.isRequired,
    user: UserType.isRequired,
  }).isRequired,
  logout: func.isRequired,
};

export default connect(
  null,
  { logout },
)(AccountBar);
