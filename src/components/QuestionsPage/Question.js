import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MarkdownRenderer from 'react-markdown-renderer';
import map from 'lodash/map';
import shortid from 'shortid';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Label from 'react-bootstrap/lib/Label';
import Well from 'react-bootstrap/lib/Well';
import Modal from 'react-bootstrap/lib/Modal';
import Panel from 'react-bootstrap/lib/Panel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import Toolbar from '../layout/Toolbar';
import Loader from '../../utils/Loader';

import { QuestionType, UserType, QListType } from '../../propTypes';

const Badge = styled(Label)`
  margin: 0 3px;
`;

const LinkStyled = styled(Link)`
  margin-top: 7px;
`;

const { arrayOf, func } = PropTypes;

class Question extends Component {
  static propTypes = {
    question: QuestionType.isRequired,
    user: UserType.isRequired,
    qlists: arrayOf(QListType),
    editQuestionField: func.isRequired,
  };

  static defaultProps = {
    qlists: [],
  };

  state = {
    showModal: false,
    textField: null,
    answerField: null,
  };

  open = (answerField, field) => () => {
    const { user, question } = this.props;

    if (user.username === question.author.username) {
      this.setState({
        showModal: true,
        answerField,
        textField: field,
      });
    }
  };

  close = () => {
    this.setState({
      showModal: false,
      answerField: null,
    });
  };

  render() {
    const { question, editQuestionField, user, qlists } = this.props;
    const { answerField, textField } = this.state;

    const panelHeader = (
      <div className="clearfix">
        <h3 className="panel-title pull-left" onClick={this.open(question.question, 'question')}>
          <MarkdownRenderer markdown={question.question} />
        </h3>
        <div className="pull-right">
          {map(question.level, level => (
            <Link to={`/questions/level/${level}`} key={level}>
              <Badge bsStyle="primary">{level}</Badge>
            </Link>
          ))}
        </div>
      </div>
    );

    const panelFooter = (
      <div className="clearfix">
        <h5 className="pull-left">
          <strong>Skill</strong>:
          {map(question.skill, skill => (
            <Link to={`/questions/skill/${skill}`} key={skill}>
              {' '}
              {skill}
            </Link>
          ))}
        </h5>
        <LinkStyled to={`/questions/practice/${question.practice}`} className="pull-right">
          <Label bsStyle="warning">{question.practice}</Label>
        </LinkStyled>
      </div>
    );

    return (
      <Fragment>
        <h2>{question.question}</h2>

        <Panel>
          <Panel.Heading>{panelHeader}</Panel.Heading>
          <Panel.Body>
            <div onClick={this.open(question.answer, 'answer')}>
              <MarkdownRenderer markdown={question.answer} />
            </div>

            <hr />

            {map(question.answers, (question, index) => (
              <em key={shortid.generate()} onClick={this.open(question, `answers.${index}.text`)}>
                <MarkdownRenderer markdown={question.text} />
              </em>
            ))}

            <hr />

            {question.notes && (
              <Well onClick={this.open(question.notes, 'notes')}>
                <MarkdownRenderer markdown={question.notes} />
              </Well>
            )}

            {question.author && (
              <small>
                <strong>Author</strong>:
                <Link to={`/questions/author/${question.author.username}`}>
                  {question.author.username}
                </Link>
              </small>
            )}

            <Link to={`/questions/${question.slug}/one`} className="pull-right">
              <FontAwesome name="comments-o" /> {question.comments && question.comments.length}
            </Link>

            <hr />

            {question.author &&
              user.username === question.author.username && (
                <ButtonGroup bsSize="small" className="pull-right">
                  <Link to={`/questions/${question._id}/edit`} className="btn btn-warning">
                    Edit
                  </Link>
                </ButtonGroup>
              )}

            {user.username && <Toolbar question={question} user={user} qlists={qlists} />}

            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Change value:
                  <strong>{textField}</strong>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Change Field and press Update button</ControlLabel>
                    <FormControl
                      name={textField}
                      componentClass="textarea"
                      inputRef={ref => {
                        this.textField = ref;
                      }}
                      defaultValue={
                        answerField && answerField.text ? answerField.text : answerField
                      }
                      rows="10"
                    />
                  </FormGroup>
                  <Button
                    bsStyle="primary"
                    onClick={() => {
                      editQuestionField(question._id, textField, this.textField.value);
                      this.close();
                    }}>
                    Update
                  </Button>
                </form>
              </Modal.Body>
            </Modal>
          </Panel.Body>
          <Panel.Footer>{panelFooter}</Panel.Footer>
        </Panel>
      </Fragment>
    );
  }
}

export default Loader('question')(Question);
