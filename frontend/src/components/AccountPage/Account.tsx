import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import compose from 'recompose/compose';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

import { getUser, removeUser, logout } from '../../actions/auth';
import { addFlashMessage } from '../../actions/flash';

import Loader from '../../utils/Loader';
import { AccountProps, AccountState } from './models';

const enhance = compose<AccountProps, {}>(
  connect(
    null,
    {
      getUser,
      removeUser,
      logout,
      addFlashMessage,
    },
  ),

  Loader('user'),
);

class Account extends Component<AccountProps, AccountState> {
  state: AccountState = {
    modal: false,
  };

  componentDidMount() {
    const { user, getUser } = this.props;

    getUser(user.username);
  }

  private toggle = () =>
    this.setState(prevState => ({ modal: !prevState.modal }));

  private remove = () => {
    const { user, removeUser, logout, addFlashMessage } = this.props;

    removeUser(user.username).then(() => {
      addFlashMessage({
        type: 'error',
        text: `The user @${user.username} is no longer available`,
      });
      logout();
    });
  };

  render() {
    const { user, logout } = this.props;

    return (
      <Fragment>
        <h1>
          {user.firstName && user.lastName ? (
            <Fragment>
              <span>
                <FontAwesome name="user" /> {user.firstName} {user.lastName}
              </span>{' '}
            </Fragment>
          ) : (
            'Your account '
          )}
          <Badge pill variant="info">
            {user.role}
          </Badge>
        </h1>

        <Image src={user.gravatar} thumbnail />

        <hr />

        <dl>
          <dt>Email:</dt>
          <dd>
            <FontAwesome name="envelope-open-o" />{' '}
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </dd>
          {user.primarySkill && (
            <div>
              <dt>Primary Skill:</dt>
              <dd>{user.primarySkill}</dd>
            </div>
          )}
          {user.jobFunction && (
            <div>
              <dt>Job Function:</dt>
              <dd>{user.jobFunction}</dd>
            </div>
          )}
          {user.skype && (
            <div>
              <dt>Skype nickname:</dt>
              <dd>
                <FontAwesome name="skype" /> {user.skype}
              </dd>
            </div>
          )}
          {user.phone && (
            <div>
              <dt>Mobile phone:</dt>
              <dd>
                <FontAwesome name="phone" /> {user.phone}
              </dd>
            </div>
          )}
        </dl>

        <p>{user.notes}</p>

        <hr />

        <ButtonGroup>
          <Link to="/me/edit" className="btn btn-info btn-sm">
            <FontAwesome name="pencil" /> Edit profile
          </Link>
          <Button variant="warning" size="sm" onClick={logout}>
            <FontAwesome name="sign-out" /> Logout
          </Button>
          <Button variant="danger" size="sm" onClick={this.toggle}>
            <FontAwesome name="times" /> Remove
          </Button>
        </ButtonGroup>

        <Modal size="sm" show={this.state.modal} onHide={this.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              If so, you will not be able to restore your private data. And you
              will also lost access to adding questions.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button variant="secondary" onClick={this.toggle}>
                Cancel
              </Button>
              <Button variant="danger" onClick={this.remove}>
                Remove
              </Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

export default enhance(Account);
