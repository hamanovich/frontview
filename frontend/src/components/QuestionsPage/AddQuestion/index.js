import React, { Component, Fragment } from 'react';
import { func, shape, string } from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import map from 'lodash/map';
import shortid from 'shortid';

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
  addQuestionsFromFile,
  removeQuestion,
  editQuestion,
  getQuestionById,
  getQuestionInterface,
} from '../../../actions/questions';

import { DropMe, DropThumb, DropThumbs } from '../style';

class AddQuestion extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    addQuestion: func.isRequired,
    addQuestionsFromFile: func.isRequired,
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
    dropzone: false,
    fileName: '',
    imgs: [],
  };

  _isMounted = false;

  componentDidMount() {
    const { getQuestionById, getQuestionInterface, addFlashMessage, match, history } = this.props;

    this._isMounted = true;

    getQuestionInterface().then(({ skill, level, practice }) => {
      if (this._isMounted) {
        this.setState({ skill, level, practice });
      }
    });

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
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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
    const query = {
      ...values,
      imgs: this.state.imgs,
      isVerified: false,
      userId,
      lastModified: new Date(),
    };

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

  imgsDropAccepted = accepted => {
    if (accepted.length + this.state.imgs.length > 3) {
      return this.props.addFlashMessage({
        type: 'error',
        text: 'Maximum 3 images are available',
      });
    }

    return accepted.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState(prevState => ({
          imgs: [...prevState.imgs, reader.result],
        }));
      };

      reader.readAsDataURL(file);
    });
  };

  handleDropAccepted = accepted => {
    const { addQuestionsFromFile, addFlashMessage, history } = this.props;
    const [file] = accepted;
    const reader = new FileReader();

    reader.onload = e => {
      this.setState({
        fileName: file.name,
      });
      const query = {
        questions: JSON.parse(e.target.result),
        userId: this.props.userId,
        lastModified: new Date(),
      };

      addQuestionsFromFile(query)
        .then(() => {
          addFlashMessage({
            type: 'success',
            text: 'New questions were added successfully.',
          });

          history.push('/questions');
        })
        .catch(err =>
          addFlashMessage({
            type: 'error',
            text: err.response.data.error,
          }),
        );
    };
    reader.readAsText(file);
  };

  imgsDropRejected = () => {
    this.props.addFlashMessage({
      type: 'error',
      text: 'Only images are accepted. Check the file size',
    });
  };

  handleDropRejected = () => {
    this.props.addFlashMessage({
      type: 'error',
      text: 'Only *.json file is accepted',
    });
  };

  removeThumb = img => {
    const { imgs } = this.state;
    const index = imgs.indexOf(img);
    this.setState({
      imgs: [...imgs.slice(0, index), ...imgs.slice(index + 1)],
    });
  };

  toggleDropzone = () => this.setState(prevState => ({ dropzone: !prevState.dropzone }));

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
    const {
      isLoading,
      showRemoveModal,
      skill,
      practice,
      level,
      fileName,
      dropzone,
      imgs,
    } = this.state;
    const { match, handleSubmit } = this.props;
    const { _id } = match.params;

    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
            <PageHeader>
              <FontAwesome name="question-circle-o" />{' '}
              {_id ? 'Edit question' : 'Add a new question'}
            </PageHeader>

            {!_id && (
              <Fragment>
                <p>
                  <Button bsStyle="info" onClick={this.toggleDropzone}>
                    {dropzone === true
                      ? 'Add a new question manually'
                      : 'Import questions from .json file'}
                  </Button>
                </p>
                <hr />
              </Fragment>
            )}

            {dropzone === true ? (
              <DropMe
                accept="application/json"
                multiple={false}
                onDropAccepted={this.handleDropAccepted}
                onDropRejected={this.handleDropRejected}
                className="dropzone"
                activeClassName="dropzone--active"
                rejectClassName="dropzone--reject">
                <h3>Want to upload JSON?</h3>
                <p>Click or drag&amp;drop file here. Only *.json file is accepted.</p>
                <p>JSON should be in the following format (array of objects):</p>
                <pre style={{ fontSize: '11px' }}>
                  {JSON.stringify(
                    [
                      {
                        question: 'The question',
                        skill: ['JS'],
                        level: ['Junior', 'Middle'],
                        answer: 'The main answer',
                        answers: [
                          {
                            text: 'Additional answer #1',
                          },
                          {
                            text: 'Additional answer #2',
                          },
                        ],
                        practice: 'practice',
                        notes: 'Some notes',
                      },
                    ],
                    null,
                    2,
                  )}
                </pre>
                <p>
                  <small>
                    <em>
                      P.S. In case wrong JSON format you should fix it by yourself or contact admin
                    </em>
                  </small>
                </p>
                <p>{fileName !== '' ? `You have added - ${fileName}` : ''}</p>
              </DropMe>
            ) : (
              <Fragment>
                <Field
                  label="Question*"
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
                      label="Choose skill* (multiple)"
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
                      label="Choose level* (multiple)"
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
                  label="Is it practical question?*&emsp;"
                  required
                  inline
                  options={map(practice, s => ({ title: s, value: s }))}
                />
                <hr />
                <Field
                  label="Answer*"
                  name="answer"
                  rows={10}
                  component={TextareaField}
                  placeholder="Write down the answer"
                />
                <FieldArray name="answers" component={AnswerFields} />
                <hr />
                <DropMe
                  accept="image/*"
                  maxSize={100000}
                  onDropAccepted={this.imgsDropAccepted}
                  onDropRejected={this.imgsDropRejected}
                  className="dropzone dropzone--imgs"
                  activeClassName="dropzone--active"
                  rejectClassName="dropzone--reject">
                  <h3>Want to upload images?</h3>
                  <p>
                    Click or drag&amp;drop image here. Only images are accepted. Max{' '}
                    <strong>3</strong> images with size <strong>100kb</strong> each.
                  </p>
                </DropMe>

                <DropThumbs>
                  {imgs.map(img => (
                    <DropThumb key={shortid.generate()}>
                      <div className="dropthumb__inner">
                        <img src={img} alt="" />
                        <Button bsStyle="danger" bsSize="sm" onClick={() => this.removeThumb(img)}>
                          <FontAwesome name="times" />
                        </Button>
                      </div>
                    </DropThumb>
                  ))}
                </DropThumbs>
                <hr />
                <Field
                  label="Notes"
                  name="notes"
                  component={TextareaField}
                  placeholder="Add some notes, if needed"
                />
                <Button type="submit" bsStyle="info" bsSize="large" block disabled={isLoading}>
                  {_id ? (
                    <span>
                      Update <FontAwesome name="refresh" />
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
              </Fragment>
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
    addQuestionsFromFile,
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
