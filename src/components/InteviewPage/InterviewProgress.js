import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import MarkdownRenderer from 'react-markdown-renderer';
import shortid from 'shortid';
import FontAwesome from 'react-fontawesome';

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Label from 'react-bootstrap/lib/Label';

import InterviewNotesForm from './InterviewNotesForm';

class InterviewProgress extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.object
    }).isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    provideFeedback: PropTypes.func.isRequired
  };

  state = {
    step: 1
  };

  componentWillMount() {
    const { history, location, addFlashMessage } = this.props;

    if (!location.state) {
      addFlashMessage({
        type: 'warn',
        text: 'Before you go next, please choose a QList'
      });

      history.push('/interview/qlists');
    }
  }

  render() {
    const { provideFeedback, location } = this.props;
    const questions = location.state.qlist.questions;
    const candidate = location.state.candidate;
    const tab = map(questions, (question, index) => (
      <Tab
        eventKey={index + 1}
        key={question._id}
        title={index + 1}
      >
        <h3><MarkdownRenderer markdown={question.question} /></h3>
        <MarkdownRenderer markdown={question.answer} />
        {map(question.answers, question => (
          <MarkdownRenderer markdown={question.text} key={shortid.generate()} />
        ))}
        {question.notes && <MarkdownRenderer markdown={question.notes} />}

        <hr />

        <p>
          {map(question.skill, skill => (
            <Label
              style={{ margin: '0 3px' }}
              bsStyle="warning"
              key={skill}
            >{skill}</Label>
          ))}
          {map(question.level, level => (
            <Label
              style={{ margin: '0 3px' }}
              bsStyle="primary"
              key={level}
            >{level}</Label>
          ))}</p>
        <p>
          <Link to={`/questions/${question.slug}/one`}>
            <FontAwesome name="link" /> question page
          </Link>
        </p>
      </Tab>));

    return (
      <div>
        <Tabs
          activeKey={this.state.step}
          onSelect={step => this.setState({ step })}
          id="progress-tabs"
        >{tab}</Tabs>

        <hr />

        <InterviewNotesForm
          provideFeedback={provideFeedback}
          candidate={candidate}
        />
      </div>
    );
  }
}

export default InterviewProgress;