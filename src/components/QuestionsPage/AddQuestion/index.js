import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import AnswerFields from './AnswerFields';
import { TextField, TextareaField, RadioButton, SelectField } from '../../formElements';

import validate from '../../../validations/question';

import { logout } from '../../../actions/auth';
import { addQuestion, removeQuestion, editQuestion, getQuestionById } from '../../../actions/questions';
import { addFlashMessage } from '../../../actions/flash';

class AddQuestion extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    removeQuestion: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    userId: PropTypes.string,
    _id: PropTypes.string
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static defaultProps = {
    _id: ''
  };

  state = {
    errors: {},
    isLoading: false,
    showModal: false
  };

  componentDidMount = () => {
    const { history } = this.context.router;
    const { getQuestionById, addFlashMessage, match } = this.props;

    if (match.params._id) {
      getQuestionById(match.params._id).then(
        (res) => {
          if (res.status === 500) {
            addFlashMessage({
              type: 'error',
              text: res.data.error
            });

            history.push('/questions/add');
          }
        },
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

  openModel = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  remove = (id) => {
    const { removeQuestion, addFlashMessage } = this.props;
    const { history } = this.context.router;

    removeQuestion(id).then(() => {
      addFlashMessage({
        type: 'success',
        text: `Question with id=${id} was successfully removed`
      });
      history.push('/questions')
    }
    );
  };

  onSubmit = (values) => {
    const { userId, match, logout, addQuestion, editQuestion, addFlashMessage } = this.props;
    const { history } = this.context.router;
    const query = { ...values, userId, lastModified: new Date() };

    if (match.params._id) {
      editQuestion(query)
        .then(() => {
          addFlashMessage({
            type: 'success',
            text: 'Question updated successfully.'
          });

          history.push('/questions');
        });
    } else {
      addQuestion(query)
        .then(() => {
          addFlashMessage({
            type: 'success',
            text: 'New question created successfully.'
          });

          history.push('/questions');
        },
      (err) => {
        addFlashMessage({
          type: 'error',
          text: err.response.data.error
        });

        logout();
        history.push('/');
      });
    }
  }

  render() {
    const { isLoading } = this.state;
    const { match, handleSubmit } = this.props;
    const { _id } = match.params;

    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
            <PageHeader>{_id ? 'Edit question' : 'Add new question'}</PageHeader>
            <Field
              label="Question*:"
              component={TextField}
              type="text"
              name="question"
              placeholder="Type new question"
            />

            <Row>
              <Col sm={6}>
                <Field
                  component={SelectField}
                  name="skill"
                  id="skill"
                  label="Choose skill* (multiple):"
                  multiple
                  type="select-multiple"
                  required
                  options={[
                    { title: 'HTML', value: 'HTML' },
                    { title: 'CSS', value: 'CSS' },
                    { title: 'JS', value: 'JS' },
                    { title: 'Soft', value: 'Soft' },
                    { title: 'Other', value: 'Other' }
                  ]}
                />
              </Col>

              <Col sm={6}>
                <Field
                  component={SelectField}
                  name="level"
                  id="level"
                  label="Choose level* (multiple):"
                  multiple
                  type="select-multiple"
                  required
                  options={[
                    { title: 'Junior', value: 'Junior' },
                    { title: 'Middle', value: 'Middle' },
                    { title: 'Senior', value: 'Senior' },
                    { title: 'Lead', value: 'Lead' },
                    { title: 'Chief', value: 'Chief' },
                    { title: 'Not defined', value: 'Not defined' }
                  ]}
                />
              </Col>
            </Row>

            <Field
              component={RadioButton}
              name="practice"
              id="practice"
              label="Is it practical question?*:"
              required
              options={[
                { title: 'Theory', value: 'theory' },
                { title: 'Practice', value: 'practice' }
              ]}
            />

            <hr />

            <Field
              label="Answer"
              name="answer"
              component={TextareaField}
              placeholder="Write down the answer"
            />

            <FieldArray
              name="answers"
              component={AnswerFields}
            />

            <hr />

            <Field
              label="Notes"
              name="notes"
              component={TextareaField}
              placeholder="Add some notes, if needed"
            />

            <Button
              type="submit"
              bsStyle="info"
              bsSize="large"
              disabled={isLoading}
            >{_id ? 'Update' : 'Add new question'}</Button>

            {_id && <div className="pull-right">
              <Button bsStyle="danger" onClick={this.openModel}>
                <FontAwesome name="trash-o" /> Remove
          </Button>

              <Modal bsSize="sm" show={this.state.showModal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>If so, you will not be able to restore this question.</p>
                </Modal.Body>
                <Modal.Footer>
                  <ButtonGroup>
                    <Button
                      bsStyle="default"
                      onClick={this.closeModal}
                    >Cancel</Button>
                    <Button
                      bsStyle="danger"
                      onClick={() => this.remove(_id)}
                    >Remove</Button>
                  </ButtonGroup>
                </Modal.Footer>
              </Modal>
            </div>}
          </Form>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state, props) {
  if (props.match.params._id) {
    const question = state.questions.find(question => question._id === props.match.params._id);
    return {
      initialValues: question,
      userId: state.auth.user._id
    };
  }

  return {
    initialValues: {},
    userId: state.auth.user._id
  };
}

export default connect(mapStateToProps,
  { logout, addQuestion, getQuestionById, removeQuestion, editQuestion, addFlashMessage })(
  reduxForm({
    form: 'addQuestion',
    validate
  })(AddQuestion));