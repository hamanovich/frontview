import React, { FunctionComponent, Fragment } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { logout } from '../../actions/auth';
import { AccountBarProps } from './models';
import { isAdmin } from '../../utils/helpers';

const AccountBar: FunctionComponent<AccountBarProps> = ({ auth, logout }) => (
  <Fragment>
    <ListGroup>
      <Link
        to={`/questions/author/${auth.user.username}`}
        className="list-group-item">
        <FontAwesome name="copyright" /> Your Questions
      </Link>
      <Link
        to={`/comments/author/${auth.user.username}`}
        className="list-group-item">
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

    {isAdmin(auth.user.role) && (
      <Fragment>
        <hr />

        <h4 className="text-danger">Admin only</h4>

        <ListGroup>
          <ListGroup.Item>To verify</ListGroup.Item>
          <Link to="/comments/not-verified" className="list-group-item">
            <FontAwesome name="commenting-o" /> Unverified comments
          </Link>
          <Link to="/questions/not-verified" className="list-group-item">
            <FontAwesome name="copyright" /> Unverified questions
          </Link>
          <Link to="/users" className="list-group-item">
            <FontAwesome name="user-o" /> All users
          </Link>
        </ListGroup>
      </Fragment>
    )}
  </Fragment>
);

export default connect(
  null,
  { logout },
)(AccountBar);
