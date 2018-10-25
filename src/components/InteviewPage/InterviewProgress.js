import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import MarkdownRenderer from 'react-markdown-renderer';
import shortid from 'shortid';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Label from 'react-bootstrap/lib/Label';

import InterviewNotesForm from './InterviewNotesForm';

import { QListType, CandidateType } from '../../propTypes';

const Badge = styled(Label)`
  margin: 0 3px;
`;

const enhance = compose(
  withState('step', 'setStep', 1),

  withHandlers({
    onSelectStep: ({ setStep }) => step => setStep(step),
  }),

  lifecycle({
    componentWillMount() {
      const { history, location, addFlashMessage } = this.props;

      if (!location.state) {
        addFlashMessage({
          type: 'warn',
          text: 'Before you go next, please choose a QList',
        });

        history.push('/interview/qlists');
      }

      if (!location.state.qlist.length) {
        addFlashMessage({
          type: 'warn',
          text: `Before you go next, please add questions to QList: ${location.state.qlist.title}`,
        });

        history.push('/questions');
      }
    },
  }),
);

const InterviewProgress = ({ step, provideFeedback, location, history, onSelectStep }) => {
  const { candidate } = location.state;
  const { questions } = location.state.qlist;
  const tab = map(questions, (question, index) => (
    <Tab eventKey={index + 1} key={question._id} title={index + 1}>
      <h3>
        <MarkdownRenderer markdown={question.question} />
      </h3>
      <MarkdownRenderer markdown={question.answer} />
      {map(question.answers, question => (
        <MarkdownRenderer markdown={question.text} key={shortid.generate()} />
      ))}
      {question.notes && <MarkdownRenderer markdown={question.notes} />}

      <hr />

      <p>
        {map(question.skill, skill => (
          <Badge bsStyle="warning" key={skill}>
            {skill}
          </Badge>
        ))}
        {map(question.level, level => (
          <Badge bsStyle="primary" key={level}>
            {level}
          </Badge>
        ))}
      </p>
      <p>
        <Link to={`/questions/${question.slug}/one`}>
          <FontAwesome name="link" /> question page
        </Link>
      </p>
    </Tab>
  ));

  return (
    <div>
      <Tabs activeKey={step} onSelect={onSelectStep} id="progress-tabs">
        {tab}
      </Tabs>

      <hr />

      <InterviewNotesForm
        provideFeedback={provideFeedback}
        candidate={candidate}
        push={history.push}
      />
    </div>
  );
};

const { shape, func, number } = PropTypes;

InterviewProgress.propTypes = {
  location: shape({
    state: shape({
      candidate: CandidateType,
      qlist: QListType,
    }),
  }).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  step: number.isRequired,
  onSelectStep: func.isRequired,
  provideFeedback: func.isRequired,
};

export default enhance(InterviewProgress);
