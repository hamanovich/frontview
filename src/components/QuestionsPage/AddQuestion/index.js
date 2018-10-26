import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import map from 'lodash/map';

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
import { addFlashMessage } from '../../../actions/flash';
import {
  addQuestion,
  removeQuestion,
  editQuestion,
  getQuestionById,
  getQuestionInterface,
} from '../../../actions/questions';

const { func, shape, string } = PropTypes;

class AddQuestion extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    addQuestion: func.isRequired,
    editQuestion: func.isRequired,
    getQuestionInterface: func.isRequired,
    addFlashMessage: func.isRequired,
    removeQuestion: func.isRequired,
    getQuestionById: func.isRequired,
    logout: func.isRequired,
    match: shape({
      params: shape({
        _id: string,
      }),
    }),
    userId: string,
    history: shape({
      push: func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    userId: '',
    match: null,
  };

  state = {
    isLoading: false,
    showRemoveModal: false,
    level: [],
    practice: [],
    skill: [],
  };

  componentDidMount = () => {
    const { getQuestionById, getQuestionInterface, addFlashMessage, match, history } = this.props;

    getQuestionInterface().then(({ skill, level, practice }) =>
      this.setState({ skill, level, practice }),
    );

    if (match.params._id) {
      getQuestionById(match.params._id).then(
        res => {
          if (res.status === 500) {
            addFlashMessage({
              type: 'error',
              text: res.data.error,
            });

            history.push('/questions/add');
          }
        },
        err => {
          addFlashMessage({
            type: 'error',
            text: err.response.data.error,
          });

          history.push('/questions/add');
        },
      );
    }
  };

  onSubmit = values => {
    const {
      userId,
      match,
      logout,
      addQuestion,
      editQuestion,
      addFlashMessage,
      history,
    } = this.props;
    const query = { ...values, userId, lastModified: new Date() };

    if (match.params._id) {
      editQuestion(query).then(() => {
        addFlashMessage({
          type: 'success',
          text: 'Question updated successfully.',
        });

        history.push('/questions');
      });
    } else {
      addQuestion(query).then(
        () => {
          addFlashMessage({
            type: 'success',
            text: 'New question created successfully.',
          });

          history.push('/questions');
        },
        err => {
          addFlashMessage({
            type: 'error',
            text: err.response.data.error,
          });

          logout();
          history.push('/');
        },
      );
    }
  };

  toggleRemoveModal = () =>
    this.setState(prevState => ({ showRemoveModal: !prevState.showRemoveModal }));

  remove = id => () => {
    const { removeQuestion, addFlashMessage, history } = this.props;

    removeQuestion(id).then(() => {
      addFlashMessage({
        type: 'success',
        text: `Question with id=${id} was successfully removed`,
      });

      history.push('/questions');
    });
  };

  render() {
    const { isLoading, showRemoveModal, skill, practice, level } = this.state;
    const { match, handleSubmit } = this.props;
    const { _id } = match.params;

    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
            <PageHeader>
              <FontAwesome name="question-circle-o" /> {_id ? 'Edit question' : 'Add new question'}
            </PageHeader>

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
                  size={5}
                  type="select-multiple"
                  required
                  options={map(skill, s => ({ title: s, value: s }))}
                />
              </Col>

              <Col sm={6}>
                <Field
                  component={SelectField}
                  name="level"
                  id="level"
                  label="Choose level* (multiple):"
                  multiple
                  size={6}
                  type="select-multiple"
                  required
                  options={map(level, s => ({ title: s, value: s }))}
                />
              </Col>
            </Row>

            <Field
              component={RadioButton}
              name="practice"
              id="practice"
              label="Is it practical question?*:&emsp;"
              required
              inline
              options={map(practice, s => ({ title: s, value: s }))}
            />

            <hr />

            <Field
              label="Answer"
              name="answer"
              component={TextareaField}
              placeholder="Write down the answer"
            />

            <FieldArray name="answers" component={AnswerFields} />

            <hr />

            <Field
              label="Notes"
              name="notes"
              component={TextareaField}
              placeholder="Add some notes, if needed"
            />

            <Button type="submit" bsStyle="info" bsSize="large" disabled={isLoading}>
              {_id ? (
                <span>
                  Update
                  <FontAwesome name="refresh" />
                </span>
              ) : (
                'Add new question'
              )}
            </Button>

            {_id && (
              <div className="pull-right">
                <Button bsStyle="danger" onClick={this.toggleRemoveModal}>
                  <FontAwesome name="trash-o" /> Remove
                </Button>

                <Modal bsSize="sm" show={showRemoveModal} onHide={this.toggleRemoveModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>If so, you will not be able to restore this question.</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <ButtonGroup>
                      <Button bsStyle="default" onClick={this.toggleRemoveModal}>
                        Cancel
                      </Button>
                      <Button bsStyle="danger" onClick={this.remove(_id)}>
                        Remove
                      </Button>
                    </ButtonGroup>
                  </Modal.Footer>
                </Modal>
              </div>
            )}
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state, props) => ({
  initialValues: props.match.params._id
    ? state.questions.find(q => q._id === props.match.params._id)
    : {},
  userId: state.auth.user._id,
});

export default connect(
  mapStateToProps,
  {
    logout,
    addQuestion,
    getQuestionById,
    removeQuestion,
    editQuestion,
    getQuestionInterface,
    addFlashMessage,
  },
)(
  reduxForm({
    form: 'addQuestion',
    validate,
  })(AddQuestion),
);
