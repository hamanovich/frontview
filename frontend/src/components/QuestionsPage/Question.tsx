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
import { BadgeStyled, ApproveBar } from './style';
import { DropThumb, DropThumbs } from './AddQuestion/style';
import { Question } from '../../propTypes/QuestionType';
import { RoleEnum } from 'propTypes';

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
  };

  private zoom = mediumZoom();

  private textInput = createRef<TextareaField>();

  private attachZoom = (image: string) => {
    this.zoom.attach(image);
  };

  private open = (
    answerField: { text: string } | string,
    field: string,
  ) => () => {
    const { user, question } = this.props;

    if (
      typeof question.author === 'object' &&
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

  render() {
    const { question, approveQuestion, user, qlists, match } = this.props;
    const { answerField, textField } = this.state;

    const panelHeader = (
      <div className="justify-content-between d-flex align-items-center">
        <h4 onClick={this.open(question.question, 'question')} className="mb-0">
          <MarkdownRenderer markdown={question.question} />
        </h4>
        <div>
          {question.level.map((level: string) => (
            <Link to={`/questions/level/${level}`} key={level}>
              <BadgeStyled variant="primary">{level}</BadgeStyled>
            </Link>
          ))}
        </div>
      </div>
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
        <Link to={`/questions/practice/${question.practice}`}>
          <Badge variant="warning">{question.practice}</Badge>
        </Link>
      </div>
    );

    return (
      <Fragment>
        <h2>
          {match ? (
            question.question
          ) : (
            <Link to={`/questions/${question.slug}/one`}>
              {question.question}
            </Link>
          )}
        </h2>
        <ApproveBar>
          <h5>
            Verified:{' '}
            {question.isVerified ? (
              <strong style={{ color: '#4cae4c' }}>Yes</strong>
            ) : (
              <strong style={{ color: '#d43f3a' }}>No</strong>
            )}
          </h5>
          {!question.isVerified &&
            (user.role === RoleEnum.ADMIN ||
              user.role === RoleEnum.SUPERADMIN) && (
              <Button
                variant="success"
                size="sm"
                onClick={() => approveQuestion(question._id)}>
                Approve
              </Button>
            )}
        </ApproveBar>

        <Card
          border={question.isVerified ? 'success' : 'danger'}
          className="question">
          <Card.Header>{panelHeader}</Card.Header>
          <Card.Body>
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
            <hr />
            {question.notes && (
              <MarkdownRenderer
                markdown={question.notes}
                onClick={this.open(question.notes, 'notes')}
              />
            )}
            {typeof question.author === 'object' &&
              question.author &&
              question.author.username && (
                <small>
                  <strong>Author</strong>:{' '}
                  <Link to={`/questions/author/${question.author.username}`}>
                    {question.author.username}
                  </Link>
                </small>
              )}
            {question.comments && question.comments.length > 0 ? (
              <Link
                to={`/questions/${question.slug}/one`}
                className="pull-right">
                <FontAwesome name="comments-o" /> {question.comments.length}
              </Link>
            ) : (
              <span className="pull-right">
                <FontAwesome name="comments-o" /> 0
              </span>
            )}
            <p>
              <small>
                Last modified:{' '}
                {format(question.lastModified, 'DD/MM/YYYY HH:mm:ss')}
              </small>
            </p>
            <hr />
            {typeof question.author === 'object' &&
              question.author &&
              (user.username === question.author.username ||
                (user.role === RoleEnum.ADMIN ||
                  user.role === RoleEnum.SUPERADMIN)) && (
                <ButtonGroup size="sm" className="pull-right">
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
      </Fragment>
    );
  }
}

export default Loader('question')(QuestionSingle);
