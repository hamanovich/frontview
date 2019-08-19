import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import FontAwesome from 'react-fontawesome';

import Media from 'react-bootstrap/Media';
import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { User } from '../../propTypes';
import { getAllUsers, removeUser } from '../../actions/users';

type UsersPageDispatchProps = {
  getAllUsers: () => Promise<{}>;
  removeUser: (username: string) => Promise<{}>;
};

type UsersPageStateProps = {
  users: User[];
};

type UsersPageProps = UsersPageStateProps & UsersPageDispatchProps;

export const UsersPage: FunctionComponent<UsersPageProps> = props => {
  const [modal, setModal] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  const toggleModal = (username = '') => {
    setModal(!modal);
    setUsername(username);
  };
  useEffect(() => {
    props.getAllUsers();
  }, [props.getAllUsers]);

  const getName = (user: User) =>
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.username;

  return (
    <Container>
      <Helmet>
        <title>Frontview: All Users</title>
      </Helmet>
      <h1>
        <FontAwesome name="user-o" /> All Users{' '}
        {props.users.length > 0 && (
          <Badge variant="primary">{props.users.length}</Badge>
        )}
      </h1>
      <Row>
        {props.users.map((user: User) => (
          <Col lg={4} sm={6} xs={12} className="mb-4" key={user._id}>
            <Media>
              <img
                width={64}
                height={64}
                className="mr-3"
                src={user.gravatar}
                alt={getName(user)}
              />
              <Media.Body>
                <h5>
                  {getName(user)} <Badge variant="dark">{user.role}</Badge>
                </h5>
                <p>{user.email}</p>
                <p>{user.notes}</p>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="warning" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => toggleModal(user.username)}>
                    Remove
                  </Button>
                </ButtonGroup>
              </Media.Body>
            </Media>
          </Col>
        ))}
      </Row>
      <Modal size="sm" show={modal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please remove User ONLY if you are pretty sure, this action can't be
            cancelled.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button variant="secondary" onClick={() => toggleModal()}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                props.removeUser(username);
                toggleModal();
              }}>
              Remove
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const mapStateToProps = (state: { users: User[] }) => ({
  users: state.users,
});

const mapDispatchToProps = {
  getAllUsers,
  removeUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersPage);
