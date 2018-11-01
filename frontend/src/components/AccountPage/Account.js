import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import compose from 'recompose/compose';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Modal from 'react-bootstrap/lib/Modal';
import Image from 'react-bootstrap/lib/Image';
import Well from 'react-bootstrap/lib/Well';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import { getUser, removeUser } from '../../actions/signup';
import { addFlashMessage } from '../../actions/flash';
import { logout } from '../../actions/auth';

import Loader from '../../utils/Loader';

import { UserType } from '../../propTypes';

const enhance = compose(
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

const { func } = PropTypes;

class Account extends Component {
  static propTypes = {
    user: UserType.isRequired,
    getUser: func.isRequired,
    logout: func.isRequired,
    removeUser: func.isRequired,
    addFlashMessage: func.isRequired,
  };

  state = {
    modal: false,
  };

  componentDidMount() {
    const { user, getUser } = this.props;

    getUser(user.username);
  }

  toggle = () => this.setState(prevState => ({ modal: !prevState.modal }));

  remove = () => {
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
        <PageHeader>
          {user.firstName && user.lastName ? (
            <span>
              <FontAwesome name="user" /> {user.firstName} {user.lastName}
            </span>
          ) : (
            'Your account'
          )}
        </PageHeader>

        <Image src={user.gravatar} thumbnail />

        <hr />

        <dl>
          <dt>Email:</dt>
          <dd>
            <FontAwesome name="envelope-open-o" /> <a href={`mailto:${user.email}`}>{user.email}</a>
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

        <Well>{user.notes}</Well>

        <hr />

        <ButtonGroup bsSize="small" className="pull-right">
          <Link to="/me/edit" className="btn btn-info">
            <FontAwesome name="pencil" /> Edit profile
          </Link>
          <Button bsStyle="warning" onClick={logout}>
            <FontAwesome name="sign-out" /> Logout
          </Button>
          <Button bsStyle="danger" onClick={this.toggle}>
            <FontAwesome name="times" /> Remove
          </Button>
        </ButtonGroup>

        <Modal bsSize="sm" show={this.state.modal} onHide={this.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              If so, you will not be able to restore your private data. And you will also lost
              access to adding questions.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button bsStyle="default" onClick={this.toggle}>
                Cancel
              </Button>
              <Button bsStyle="danger" onClick={this.remove}>
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