import React, { FC } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { logout } from '../../actions/auth';
import { AccountBarProps } from './models';

const AccountBar: FC<AccountBarProps> = ({ auth, logout }) => (
  <ListGroup>
    <Link
      to={`/questions/author/${auth.user.username}`}
      className="list-group-item">
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
    <Button block variant="warning" onClick={logout}>
      <FontAwesome name="sign-out" /> Logout
    </Button>
  </ListGroup>
);

export default connect(
  null,
  { logout },
)(AccountBar);
