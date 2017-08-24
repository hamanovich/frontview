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

import AnswerFields from './AnswerFields';
import TextField from '../formElements/TextField';
import TextareaField from '../formElements/TextareaField';
import RadioButton from '../formElements/RadioButton';
import SelectField from '../formElements/SelectField';

import validate from '../../validations/question';

class AddQuestionForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    removeQuestion: PropTypes.func.isRequired,
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

  openModel = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onSubmit = (values) => {
    const { userId, _id, addQuestion, editQuestion, addFlashMessage } = this.props;
    const query = { ...values, userId, lastModified: new Date() };

    if (_id) {
      editQuestion(query)
        .then(() => addFlashMessage({
          type: 'success',
          text: 'Question updated successfully.'
        }));
    } else {
      addQuestion(query)
        .then(() => {
          addFlashMessage({
            type: 'success',
            text: 'New question created successfully.'
          });
        });
    }

    this.context.router.history.push('/questions');
  }

  render() {
    const { isLoading } = this.state;
    const { _id, handleSubmit, removeQuestion } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
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
                  onClick={() => removeQuestion(_id)}
                >Remove</Button>
              </ButtonGroup>
            </Modal.Footer>
          </Modal>
        </div>}
      </Form>
    );
  }
}

function mapStateToProps(state, props) {
  if (props._id && typeof state.questions !== 'undefined') {
    const question = state.questions.find(question => question._id === props._id);
    return {
      initialValues: question
    };
  }

  return { initialValues: {} };
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'addQuestion',
    validate
  })(AddQuestionForm));
