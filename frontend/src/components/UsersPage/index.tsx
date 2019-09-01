import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
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
import Form from 'react-bootstrap/Form';

import { User, Auth, RoleEnum } from '../../propTypes';
import { getAllUsers, removeUser, updateUserRole } from '../../actions/users';
import { isAdmin } from 'utils/helpers';

type UserPageOwnProps = {
  auth: Auth;
};

type UsersPageDispatchProps = {
  getAllUsers: () => Promise<{}>;
  removeUser: (username: string) => Promise<{}>;
  updateUserRole: (username: string, role: string) => Promise<{}>;
};

type UsersPageStateProps = {
  users: User[];
};

type UsersPageProps = UserPageOwnProps &
  UsersPageStateProps &
  UsersPageDispatchProps;

export const UsersPage: FunctionComponent<UsersPageProps> = ({
  getAllUsers,
  removeUser,
  updateUserRole,
  auth,
  users,
}) => {
  const [removeModal, setRemoveModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const roleRef = useRef(null);

  const toggleRemoveModal = (username = '') => {
    setRemoveModal(!removeModal);
    if (username) setUsername(username);
  };

  const toggleEditModal = (username = '') => {
    setEditModal(!editModal);
    if (username) setUsername(username);
  };

  const getName = (user: User) =>
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.username;

  const showButtonGroup = (user: User) => {
    if (isAdmin(auth.user.role)) {
      if (user.role === auth.user.role || user.role === RoleEnum.SUPERADMIN) {
        return false;
      }
      return true;
    }

    return false;
  };

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <Container>
      <Helmet>
        <title>Frontview: All Users</title>
      </Helmet>
      <h1>
        <FontAwesome name="user-o" /> All Users{' '}
        {users.length > 0 && <Badge variant="primary">{users.length}</Badge>}
      </h1>
      <Row>
        {users.map((user: User) => (
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
                  {getName(user)}{' '}
                  <Badge variant={isAdmin(user.role) ? 'success' : 'dark'}>
                    {user.role}
                  </Badge>
                </h5>
                <p>{user.email}</p>
                <p>{user.notes}</p>
                {showButtonGroup(user) && (
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => toggleEditModal(user.username)}>
                      Change Role
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => toggleRemoveModal(user.username)}>
                      Remove
                    </Button>
                  </ButtonGroup>
                )}
              </Media.Body>
            </Media>
          </Col>
        ))}
      </Row>
      <Modal size="sm" show={removeModal} onHide={toggleRemoveModal}>
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
            <Button variant="secondary" onClick={() => toggleRemoveModal()}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                removeUser(username);
                toggleRemoveModal();
              }}>
              Remove
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>

      <Modal show={editModal} onHide={toggleEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update user fields carefully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <p>
              If you change role to{' '}
              <strong className="text-danger">admin</strong>, this action can't
              be undone
            </p>
            <Form.Group>
              <Form.Label htmlFor="formControlsTextarea">
                Change Role and press Update button
              </Form.Label>
              <Form.Control as="select" name="role" ref={roleRef}>
                <option value="user">User</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button variant="secondary" onClick={() => toggleEditModal()}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                updateUserRole(username, (roleRef.current as any).value);
                toggleEditModal();
              }}>
              Update
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
  updateUserRole,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersPage);
