import React, { Component, Fragment, FormEvent } from 'react';
import { Field, FieldArray, reduxForm, InjectedFormProps } from 'redux-form';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import shortid from 'shortid';
import Dropzone from 'react-dropzone';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import AnswerFields from './AnswerFields';
import {
  TextField,
  TextareaField,
  RadioButton,
  SelectField,
} from '../../formElements';
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
import { DropMe, DropThumb, DropThumbs } from './style';
import { GetQuestionsError } from '../models';
import DropzoneJSON from './DropzoneJSON';
import { AddFlashMessageType, User, Question, Auth } from '../../../propTypes';
import { isAdmin } from '../../../utils/helpers';

type AddQuestionProps = {
  handleSubmit: (
    onSubmit: (value: any) => void,
  ) => ((event: FormEvent<HTMLFormElement>) => void) | undefined;
  addQuestion: any;
  addQuestionsFromFile: (query: any) => any;
  editQuestion: (data: any) => Promise<void>;
  getQuestionInterface: () => Promise<{
    skill: string[];
    level: string[];
    practice: string[];
  }>;
  addFlashMessage: AddFlashMessageType;
  removeQuestion: (id: string) => Promise<void>;
  getQuestionById: (_id: string) => Promise<any>;
  logout: any;
  match: {
    params: {
      _id: string;
    };
  };
  user: User;
  history: {
    push: (url: string) => void;
  };
  initialValues: any;
};

type AddQuestionState = {
  isLoading: boolean;
  showRemoveModal: boolean;
  level: string[];
  practice: string[];
  skill: string[];
  dropzone: boolean;
  fileName: string;
  imgs: any[];
};

type AddQuestionMapState = {
  questions: Question[];
  auth: Auth;
};

type AddQuestionMapProps = {
  match: {
    params: {
      _id: string;
    };
  };
};

class AddQuestion extends Component<
  AddQuestionProps & InjectedFormProps<{}, AddQuestionProps>,
  AddQuestionState
> {
  static defaultProps = {
    match: undefined,
    initialValues: {},
  };

  state: AddQuestionState = {
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
    const {
      getQuestionById,
      getQuestionInterface,
      addFlashMessage,
      match,
      history,
    } = this.props;

    this._isMounted = true;

    getQuestionInterface().then(
      ({
        skill,
        level,
        practice,
      }: {
        skill: string[];
        level: string[];
        practice: string[];
      }) => {
        if (this._isMounted) {
          this.setState({ skill, level, practice });
        }
      },
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

          this.setState({
            imgs: this.props.initialValues.imgs,
          });
        },
        err => {
          addFlashMessage({
            type: 'error',
            text:
              err.response && err.response.data.error
                ? err.response.data.error
                : `${err.message}. Please check your internet connection`,
          });

          history.push('/questions/add');
        },
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  private onSubmit = (values: any) => {
    const {
      user,
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
      userId: user._id,
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
    } else if (Object.keys(values).length > 4) {
      addQuestion(query).then(
        () => {
          addFlashMessage({
            type: 'success',
            text: 'New question created successfully.',
          });

          history.push('/questions');
        },
        (err: GetQuestionsError) => {
          addFlashMessage({
            type: 'error',
            text:
              err.response && err.response.data.error
                ? err.response.data.error
                : `${err.message}. Please check your internet connection`,
          });

          logout();
          history.push('/');
        },
      );
    } else {
      addFlashMessage({
        type: 'warn',
        text: 'Not all required fields are filled properly',
      });
    }
  };

  private imgsDropAccepted = (accepted: Blob[]) => {
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

  private handleDropAccepted = (accepted: any) => {
    const { addQuestionsFromFile, addFlashMessage, history } = this.props;
    const [file] = accepted;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.setState({
        fileName: file.name,
      });
      const query = {
        questions: JSON.parse(e.target.result),
        userId: this.props.user._id,
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
        .catch((err: GetQuestionsError) =>
          addFlashMessage({
            type: 'error',
            text:
              err.response && err.response.data.error
                ? err.response.data.error
                : `${err.message}. Please check your internet connection`,
          }),
        );
    };
    reader.readAsText(file);
  };

  private imgsDropRejected = () => {
    this.props.addFlashMessage({
      type: 'error',
      text: 'Only images are accepted. Check the file size',
    });
  };

  private handleDropRejected = () => {
    this.props.addFlashMessage({
      type: 'error',
      text: 'Only *.json file is accepted',
    });
  };

  private removeThumb = (img: string) => {
    const { imgs } = this.state;
    const index = imgs.indexOf(img);
    this.setState({
      imgs: [...imgs.slice(0, index), ...imgs.slice(index + 1)],
    });
  };

  private toggleDropzone = () =>
    this.setState(prevState => ({ dropzone: !prevState.dropzone }));

  private toggleRemoveModal = () =>
    this.setState(prevState => ({
      showRemoveModal: !prevState.showRemoveModal,
    }));

  private remove = (id: string) => {
    const { removeQuestion, addFlashMessage, history } = this.props;

    removeQuestion(id).then(() => {
      addFlashMessage({
        type: 'success',
        text: `Question with __id=${id}__ was successfully removed`,
      });

      history.push('/questions');
    });
  };

  private mapOptions = (options: string[]) =>
    options.map((o: string) => ({
      title: o,
      value: o,
    }));

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
    const { match, handleSubmit, user } = this.props;
    const { _id } = match.params;

    return (
      <Row>
        <Col xl={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
            <h1>
              <FontAwesome name="question-circle-o" />{' '}
              {_id ? 'Edit question' : 'Add a new question'}
            </h1>

            {!_id && isAdmin(user.role) && (
              <Fragment>
                <p>
                  <Button variant="info" onClick={this.toggleDropzone}>
                    {dropzone === true
                      ? 'Add a new question manually'
                      : 'Import questions from .json file'}
                  </Button>
                </p>
                <hr />
              </Fragment>
            )}

            {dropzone === true ? (
              <DropzoneJSON
                handleDropAccepted={this.handleDropAccepted}
                handleDropRejected={this.handleDropRejected}
                fileName={fileName}
              />
            ) : (
              <Fragment>
                <Field
                  label="Question"
                  component={TextField}
                  type="text"
                  name="question"
                  placeholder="Type new question"
                  required
                />
                <Row>
                  <Col sm={6}>
                    <Field
                      component={SelectField}
                      name="skill"
                      id="skill"
                      label="Choose skill (multiple)"
                      multiple
                      size={5}
                      type="select-multiple"
                      required
                      options={this.mapOptions(skill)}
                    />
                  </Col>

                  <Col sm={6}>
                    <Field
                      component={SelectField}
                      name="level"
                      id="level"
                      label="Choose level (multiple)"
                      multiple
                      size={6}
                      type="select-multiple"
                      required
                      options={this.mapOptions(level)}
                    />
                  </Col>
                </Row>
                <Field
                  component={RadioButton}
                  name="practice"
                  id="practice"
                  label="Is it practical question?"
                  required
                  inline
                  options={this.mapOptions(practice)}
                />
                <hr />
                <Field
                  label="Answer"
                  name="answer"
                  rows={10}
                  component={TextareaField}
                  placeholder="Write down the answer"
                  required
                />
                <FieldArray name="answers" component={AnswerFields as any} />
                <hr />
                <Dropzone
                  accept="image/*"
                  maxSize={100000}
                  onDropAccepted={this.imgsDropAccepted}
                  onDropRejected={this.imgsDropRejected}>
                  {({ getRootProps, getInputProps }) => (
                    <DropMe {...getRootProps()}>
                      <h3>Want to upload images?</h3>
                      <input {...getInputProps()} />
                      <p>
                        Click or drag&amp;drop image here. Only images are
                        accepted. Max <strong>3</strong> images with size{' '}
                        <strong>100kb</strong> each.
                      </p>
                    </DropMe>
                  )}
                </Dropzone>

                <DropThumbs>
                  {imgs.map(img => (
                    <DropThumb key={shortid.generate()}>
                      <div className="dropthumb__inner">
                        <img src={img} alt="" />
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => this.removeThumb(img)}>
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
                <Button
                  type="submit"
                  variant="info"
                  size="lg"
                  disabled={isLoading}>
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
                    <Button variant="danger" onClick={this.toggleRemoveModal}>
                      <FontAwesome name="trash-o" /> Remove
                    </Button>

                    <Modal
                      size="sm"
                      show={showRemoveModal}
                      onHide={this.toggleRemoveModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          If so, you will not be able to restore this question.
                        </p>
                      </Modal.Body>
                      <Modal.Footer>
                        <ButtonGroup>
                          <Button
                            variant="secondary"
                            onClick={this.toggleRemoveModal}>
                            Cancel
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => this.remove(_id)}>
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

const mapStateToProps = (
  state: AddQuestionMapState,
  props: AddQuestionMapProps,
) => ({
  initialValues: props.match.params._id
    ? state.questions.find(q => q._id === props.match.params._id)
    : null,
  user: state.auth.user,
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
  reduxForm<{}, any>({
    form: 'addQuestion',
    validate,
    // Known issue: https://github.com/erikras/redux-form/issues/2971
    // After submit the form won't be resetted :(
    // destroyOnUnmount: false,
  })(AddQuestion),
);
