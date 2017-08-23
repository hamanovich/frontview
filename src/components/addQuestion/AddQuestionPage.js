import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import AddQuestionForm from './AddQuestionForm';
import { selectUser } from '../../selectors';
import { addQuestion, editQuestion, getQuestionById } from '../../actions/questions';
import { addFlashMessage } from '../../actions/flashMessages';

class AddQuestionPage extends Component {
  static propTypes = {
    addQuestion: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    getQuestionById: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    const { route, history } = this.context.router;
    const { getQuestionById, addFlashMessage } = this.props;

    if (route.match.params._id) {
      getQuestionById(route.match.params._id).then(
        () => {},
        (err) => {
          addFlashMessage({
            type: 'error',
            text: err.response.data.error
          });

          history.push('/questions/add');
        }
      );
    }
  };

  render() {
    const { addQuestion, addFlashMessage, editQuestion, userId } = this.props;
    const { _id } = this.context.router.route.match.params;

    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <h1>{_id ? 'Edit question' : 'Add new question'}</h1>
          <AddQuestionForm
            addFlashMessage={addFlashMessage}
            addQuestion={addQuestion}
            editQuestion={editQuestion}
            userId={userId}
            _id={_id}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({ userId: selectUser(state)._id });

export default connect(mapStateToProps, { addQuestion, getQuestionById, editQuestion, addFlashMessage })(AddQuestionPage);