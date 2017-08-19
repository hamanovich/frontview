import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Modal from 'react-bootstrap/lib/Modal';

class Account extends Component {
  state = {
    modal: false
  };

  close = () => {
    this.setState({
      modal: false
    });
  };

  open = () => {
    this.setState({
      modal: true
    });
  };

  render() {
    const user = {
      first_name: 'Siarhei',
      last_name: 'Hamanovich',
      email: 'hamanovich@gmail.com',
      primary_skill: 'UXD',
      job_function: 'Lead Software Engineer',
      notes: 'Lorem content…'
    }
    return (
      <div>
        <h1>{user.first_name} {user.last_name}</h1>

        <dl>
          <dt>Email:</dt>
          <dd>{user.email}</dd>
          <dt>Primary Skill:</dt>
          <dd>{user.primary_skill}</dd>
          <dt>Job Function:</dt>
          <dd>{user.job_function}</dd>
        </dl>
        
        <p className="lead">{user.notes}</p>

        <hr />

        <ButtonGroup bsSize="small" className="pull-right">
          <Link to="/account/edit" className="btn btn-warning">Edit profile</Link>
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
              <Button bsStyle="danger" onClick={() => { }}>Remove</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </div >
    );
  }
}

export default Account;