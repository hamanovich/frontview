import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';

import { getQLists, removeQList } from '../../actions/qlists';

import { RemoveIcon } from './style';
import { QListsProps, QListsState } from './models';
import { QListQuestions } from '../../propTypes/QListType';

class QLists extends Component<QListsProps, QListsState> {
  static defaultProps = {
    username: '',
  };

  state: QListsState = {
    showModal: false,
    id: '',
  };

  componentDidMount() {
    const { username, getQLists } = this.props;

    getQLists(username);
  }

  private toggleModal = (id: string = '') =>
    this.setState(prevState => ({ showModal: !prevState.showModal, id }));

  private remove = () => {
    this.props.removeQList(this.state.id);
    this.toggleModal();
  };

  render() {
    const { qlists, username } = this.props;
    const { showModal } = this.state;

    return (
      <Fragment>
        <h1>
          <FontAwesome name="list-ol" /> QLists
        </h1>

        <ListGroup>
          {qlists.length > 0
            ? qlists.map((qlist: QListQuestions) => (
                <ListGroup.Item key={qlist.slug}>
                  <h4>
                    <Link to={`/questions/${username}/qlist/${qlist.slug}`}>
                      {qlist.title}{' '}
                      <Badge variant="primary">{qlist.questions.length}</Badge>
                    </Link>
                  </h4>
                  <p>{qlist.notes}</p>
                  <RemoveIcon onClick={() => this.toggleModal(qlist._id)}>
                    <FontAwesome name="trash" />
                  </RemoveIcon>
                </ListGroup.Item>
              ))
            : 'There are no QLists found'}
        </ListGroup>

        <Modal size="sm" show={showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>If so, you will not be able to restore this QList.</p>
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button variant="secondary" onClick={() => this.toggleModal()}>
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

const mapStateToProps = (state: { qlists: QListQuestions[] }) => ({
  qlists: state.qlists,
});

export default connect(
  mapStateToProps,
  { getQLists, removeQList },
)(QLists);
