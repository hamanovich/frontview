import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import map from 'lodash/map';
import styled from 'styled-components';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Badge from 'react-bootstrap/lib/Badge';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Modal from 'react-bootstrap/lib/Modal';

import { getQLists, removeQList } from '../../actions/qlists';

import { QListType } from '../../propTypes';

const RemoveIcon = styled.button`
  position: absolute;
  right: 10px;
  top: 15px;
  background: none;
  border: none;

  &:hover {
    color: #23527c;
  }
`;

const { func, string, arrayOf } = PropTypes;

class QLists extends Component {
  static propTypes = {
    getQLists: func.isRequired,
    removeQList: func.isRequired,
    qlists: arrayOf(QListType).isRequired,
    userId: string.isRequired,
  };

  state = {
    showModal: false,
    id: '',
  };

  componentDidMount() {
    const { userId, getQLists } = this.props;

    getQLists(userId);
  }

  toggleModal = (id = null) =>
    this.setState(prevState => ({ showModal: !prevState.showModal, id }));

  remove = () => {
    this.props.removeQList(this.state.id);
    this.toggleModal();
  };

  render() {
    const { qlists } = this.props;
    const { showModal } = this.state;

    return (
      <div>
        <PageHeader>
          <FontAwesome name="list-ol" /> QLists
        </PageHeader>

        <ListGroup>
          {map(qlists, qlist => (
            <ListGroupItem key={qlist.slug}>
              <h4>
                <Link to={`/questions/qlist/${qlist.slug}`}>
                  {qlist.title} <Badge>{qlist.questions.length}</Badge>
                </Link>
              </h4>
              <p>{qlist.notes}</p>
              <RemoveIcon onClick={() => this.toggleModal(qlist._id)}>
                <FontAwesome name="trash" />
              </RemoveIcon>
            </ListGroupItem>
          ))}
        </ListGroup>

        <Modal bsSize="sm" show={showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>If so, you will not be able to restore this QList.</p>
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button bsStyle="default" onClick={this.toggleModal}>
                Cancel
              </Button>
              <Button bsStyle="danger" onClick={this.remove}>
                Remove
              </Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  qlists: state.qlists,
});

export default connect(
  mapStateToProps,
  { getQLists, removeQList },
)(QLists);
