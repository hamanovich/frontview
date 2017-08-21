import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Modal from 'react-bootstrap/lib/Modal';

import { removeUser, getUser } from '../../actions/signup';
import { addFlashMessage } from '../../actions/flashMessages';
import { logout } from '../../actions/auth';

class Account extends Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      job_function: PropTypes.string,
      primary_skill: PropTypes.string,
      notes: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string
    }).isRequired,
    logout: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  state = {
    modal: false
  };

  componentWillMount() {
    const { getUser, user } = this.props;

    getUser(user.username);
  }

  close = () => {
    this.setState({ modal: false });
  };

  open = () => {
    this.setState({ modal: true });
  };

  remove = (_id) => {
    const { user, removeUser, logout, addFlashMessage } = this.props;

    removeUser(user.username).then(
      () => {
        addFlashMessage({
          type: 'error',
          text: `The user @${user.username} is no longer available`
        });
        logout();
      },
      err => console.error(err)
    );
  };

  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>{user.first_name && user.last_name ? <span>{user.first_name} {user.last_name}</span> : 'Your account'}</h1>

        <dl>
          <dt>Email:</dt>
          <dd>{user.email}</dd>
          {user.primary_skill &&
            <div>
              <dt>Primary Skill:</dt>
              <dd>{user.primary_skill}</dd>
            </div>}
          {user.job_function &&
            <div>
              <dt>Job Function:</dt>
              <dd>{user.job_function}</dd>
            </div>}
        </dl>

        <p className="lead">{user.notes}</p>

        <hr />

        <ButtonGroup bsSize="small" className="pull-right">
          <Link to="/me/edit" className="btn btn-warning">Edit profile</Link>
          <Button bsStyle="danger" onClick={() => { this.open() }}>Remove profile</Button>
        </ButtonGroup>

        <Modal bsSize="sm" show={this.state.modal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>If so, you will not be able to restore your private data. And you will also lost access to adding questions.</p>
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button bsStyle="default" onClick={this.close}>Cancel</Button>
              <Button bsStyle="danger" onClick={() => this.remove()}>Remove</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </div >
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, { removeUser, getUser, logout, addFlashMessage })(Account);