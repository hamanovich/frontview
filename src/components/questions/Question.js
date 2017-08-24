import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Link } from 'react-router-dom';
import MarkdownRenderer from 'react-markdown-renderer';
import map from 'lodash/map';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Label from 'react-bootstrap/lib/Label';
import Well from 'react-bootstrap/lib/Well';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Modal from 'react-bootstrap/lib/Modal';
import Panel from 'react-bootstrap/lib/Panel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class Question extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    editQuestionField: PropTypes.func.isRequired
  };

  state = {
    showModal: false,
    textField: null,
    answerField: null
  };

  open = (answerField, field) => {
    const { user, question } = this.props;

    if (user.username === question.author.username) {
      this.setState({
        showModal: true,
        answerField,
        textField: field
      });
    }
  };

  close = () => {
    this.setState({
      showModal: false,
      answerField: null
    });
  };

  render() {
    const { question, editQuestionField, user } = this.props;
    const { answerField, textField } = this.state;

    const panelHeader = (
      <div className="clearfix">
        <h3 className="panel-title pull-left">
          <span className="edit-field" onClick={() => this.open(question.question, 'question')}>
            <MarkdownRenderer markdown={question.question} />
          </span>
        </h3>
        <div className="pull-right">
          {question.level && map(question.level, level => (
            <Label
              style={{ margin: '0 3px' }}
              bsStyle="primary"
              key={shortid.generate()}
            >{level}</Label>
          ))}
        </div>
      </div>
    );

    const panelFooter = (
      <div className="clearfix">
        <h5 className="pull-left">
          <strong>Skill</strong>:
            {question.skill && map(question.skill, skill => (
            <a href={`/tags/${skill}`} key={shortid.generate()}>{' '}{skill}</a>
          ))}
        </h5>
        <Label
          bsStyle="warning"
          className="pull-right"
        >{question.theory}</Label>
      </div>
    );

    return (
      <Panel header={panelHeader} footer={panelFooter}>
        <ListGroup fill>
          {question.answer &&
            <ListGroupItem bsStyle="success" style={{ whiteSpace: 'pre-wrap' }} onClick={() => this.open(question.answer, 'answer')}>
              <MarkdownRenderer markdown={question.answer} />
            </ListGroupItem>}
          {question.answers && map(question.answers, (question, index) => (
            <ListGroupItem
              key={shortid.generate()}
              style={{ whiteSpace: 'pre-wrap' }}
              onClick={() => this.open(question, `answers.${index}.text`)}
            >
              <MarkdownRenderer markdown={question.text} />
            </ListGroupItem>
          ))}
        </ListGroup>

        {question.notes &&
          <Well onClick={() => this.open(question.notes, 'notes')}>
            <MarkdownRenderer markdown={question.notes} />
          </Well>}
        <small><strong>Author</strong>: {question.author.username}</small>

        <hr />

        {user.username === question.author.username &&
          <ButtonGroup bsSize="small" className="pull-right">
            <Link to={`/questions/${question._id}/edit`} className="btn btn-warning">Edit</Link>
          </ButtonGroup>
        }

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Change value: <strong>{this.state.textField}</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Change Field and press Update button</ControlLabel>
                <FormControl
                  name={textField}
                  componentClass="textarea"
                  inputRef={(ref) => { this.textField = ref; }}
                  defaultValue={(answerField && answerField.text)
                    ? answerField.text
                    : answerField}
                  rows="10"
                />
              </FormGroup>
              <Button
                bsStyle="primary"
                onClick={() => { editQuestionField(question._id, textField, this.textField.value); this.close(); }}
              >Update</Button>
            </form>
          </Modal.Body>
        </Modal>
      </Panel >
    );
  }
}

export default Question;