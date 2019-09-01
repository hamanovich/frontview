import React, { Component, Fragment, createRef } from 'react';
import { Link } from 'react-router-dom';
import MarkdownRenderer from 'react-markdown-renderer';
import shortid from 'shortid';
import FontAwesome from 'react-fontawesome';
import format from 'date-fns/format';
import mediumZoom from 'medium-zoom';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import Toolbar from '../shared/Toolbar';
import ZoomImage from '../shared/ZoomImage';
import Loader from '../../utils/Loader';
import { QuestionProps, QuestionState } from './models';
import { TextareaField } from '../formElements';
import { BadgeStyled } from './style';
import { DropThumb, DropThumbs } from './AddQuestion/style';
import { Question } from '../../propTypes/QuestionType';
import { User } from 'propTypes';
import { isAdmin } from '../../utils/helpers';

class QuestionSingle extends Component<QuestionProps, QuestionState> {
  static defaultProps = {
    qlists: [],
    history: {},
    match: null,
  };

  state: QuestionState = {
    showModal: false,
    textField: '',
    answerField: '',
    showAnswer: false,
  };

  private zoom = mediumZoom();

  private textInput = createRef<TextareaField>();

  private open = (
    answerField: { text: string } | string,
    field: string,
  ) => () => {
    const { user, question } = this.props;

    if (
      typeof question.author === 'object' &&
      question.author &&
      user.username === question.author.username
    ) {
      this.setState({
        showModal: true,
        answerField,
        textField: field,
      });
    }
  };

  private close = () => {
    const { history, editQuestionField, question } = this.props;
    const { textField, answerField } = this.state;

    this.setState({
      showModal: false,
      answerField: '',
    });

    if (answerField === this.textInput.current!.value) {
      return;
    }

    editQuestionField(
      question._id,
      textField,
      this.textInput.current!.value,
    ).then((q: Question) => {
      if (history.push && question.slug !== q.slug) {
        history.push('/questions');
      }
    });
  };

  private toggleAnswer = () => {
    this.setState({
      showAnswer: !this.state.showAnswer,
    });
  };

  private isAuthor = (user: User, question: Question) =>
    typeof question.author === 'object' &&
    question.author &&
    user.username === question.author.username;

  render() {
    const { question, approveQuestion, user, qlists, match } = this.props;
    const { answerField, textField, showAnswer } = this.state;

    const panelHeader = (
      <h5 onClick={this.open(question.question, 'question')} className="mb-0">
        {match ? (
          question.question
        ) : (
          <Link to={`/questions/${question.slug}/one`}>
            {question.question}
          </Link>
        )}
      </h5>
    );

    const panelFooter = (
      <div className="justify-content-between d-flex align-items-center">
        <h6 className="mb-0">
          <strong>Skill</strong>:{' '}
          {question.skill.map((skill: string) => (
            <Link to={`/questions/skill/${skill}`} key={skill}>
              {skill}{' '}
            </Link>
          ))}
        </h6>
        <div>
          <Link to={`/questions/practice/${question.practice}`}>
            <Badge variant="warning">{question.practice}</Badge>
          </Link>
          {' | '}
          {question.level.map((level: string) => (
            <Link to={`/questions/level/${level}`} key={level}>
              <Badge variant="primary">{level}</Badge>
            </Link>
          ))}
        </div>
      </div>
    );

    return (
      <Card
        className="question"
        border={!question.isVerified ? 'danger' : undefined}>
        {!match && <Card.Header>{panelHeader}</Card.Header>}
        <Card.Body>
          {(showAnswer || match) && (
            <div>
              <div onClick={this.open(question.answer, 'answer')}>
                <MarkdownRenderer markdown={question.answer} />
              </div>
              {question.answers.length > 0 && <hr />}
              {question.answers.map(
                (question: { text: string }, index: number) => (
                  <em
                    key={shortid.generate()}
                    onClick={this.open(question, `answers.${index}`)}>
                    <MarkdownRenderer markdown={question.text} />
                  </em>
                ),
              )}
              {question.imgs && (
                <DropThumbs>
                  {question.imgs.map(img => (
                    <DropThumb key={shortid.generate()}>
                      <div className="dropthumb__inner">
                        <ZoomImage
                          src={img}
                          alt=""
                          zoom={this.zoom}
                          background="rgba(100, 100, 100, .5)"
                        />
                      </div>
                    </DropThumb>
                  ))}
                </DropThumbs>
              )}
              {question.notes && (
                <MarkdownRenderer
                  markdown={question.notes}
                  onClick={this.open(question.notes, 'notes')}
                />
              )}
              <hr />
            </div>
          )}
          {!match && (
            <p>
              <Button variant="outline-success" onClick={this.toggleAnswer}>
                {showAnswer ? 'Hide' : 'Show'} Answer
              </Button>
            </p>
          )}

          <small>
            <strong>Author</strong>:{' '}
            {typeof question.author === 'object' &&
            question.author &&
            question.author.username ? (
              <Link to={`/questions/author/${question.author.username}`}>
                {question.author.username}
              </Link>
            ) : (
              'Unknown (deactivated)'
            )}
          </small>
          {question.comments && question.comments.length > 0 ? (
            <Link to={`/questions/${question.slug}/one`} className="pull-right">
              <FontAwesome name="comments-o" /> {question.comments.length}
            </Link>
          ) : (
            <span className="pull-right">
              <FontAwesome name="comments-o" /> 0
            </span>
          )}
          {match && (
            <p>
              <small>
                Last modified:{' '}
                {format(question.lastModified, 'DD/MM/YYYY HH:mm:ss')}
              </small>
            </p>
          )}
          {user.username && (
            <Fragment>
              <hr />

              {(isAdmin(user.role) || this.isAuthor(user, question)) && (
                <ButtonGroup size="sm" className="pull-right">
                  {!question.isVerified && isAdmin(user.role) && (
                    <Button
                      variant="success"
                      onClick={() => approveQuestion(question._id)}>
                      Approve
                    </Button>
                  )}
                  <Link
                    to={`/questions/${question._id}/edit`}
                    className="btn btn-warning">
                    Edit
                  </Link>
                </ButtonGroup>
              )}
              {user.username && (
                <Toolbar question={question} user={user} qlists={qlists} />
              )}
            </Fragment>
          )}

          <Modal show={this.state.showModal} onHide={this.close} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                Change value: <strong>{textField}</strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label htmlFor="formControlsTextarea">
                    Change Field and press Update button
                  </Form.Label>
                  <Form.Control
                    name={textField}
                    as="textarea"
                    ref={this.textInput}
                    defaultValue={
                      typeof answerField === 'object' &&
                      answerField &&
                      answerField.text
                        ? answerField.text
                        : answerField
                    }
                    rows="10"
                  />
                </Form.Group>
                <Button variant="primary" onClick={this.close}>
                  Update
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Card.Body>
        <Card.Footer>{panelFooter}</Card.Footer>
      </Card>
    );
  }
}

export default Loader('question')(QuestionSingle);
