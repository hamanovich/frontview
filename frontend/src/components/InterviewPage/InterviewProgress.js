import React, { Fragment } from 'react';
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

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

import InterviewNotesForm from './InterviewNotesForm';

const BadgeStyled = styled(Badge)`
  margin: 0 3px;
`;

const enhance = compose(
  withState('step', 'setStep', 1),

  withHandlers({
    onSelectStep: ({ setStep }) => step => setStep(step),
  }),

  lifecycle({
    componentWillMount() {
      const { history, location, userId, addFlashMessage } = this.props;

      if (!userId) {
        history.push('/');
        return;
      }

      if (!location.state) {
        addFlashMessage({
          type: 'warn',
          text: 'Before you go next, choose a QList',
        });

        history.push('/interview/qlists');
      }

      if (location.state && !location.state.qlist.questions.length) {
        addFlashMessage({
          type: 'warn',
          text: `Before you go next, add questions to QList: ${location.state.qlist.title}`,
        });

        history.push('/questions');
      }
    },
  }),
);

const InterviewProgress = ({
  step,
  provideFeedback,
  location,
  history,
  onSelectStep,
}) => {
  const candidate = location.state ? location.state.candidate : '';
  const questions = location.state ? location.state.qlist.questions : [];
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
          <BadgeStyled variant="warning" key={skill}>
            {skill}
          </BadgeStyled>
        ))}
        {map(question.level, level => (
          <BadgeStyled variant="primary" key={level}>
            {level}
          </BadgeStyled>
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
    <Fragment>
      <Tabs activeKey={step} onSelect={onSelectStep} id="progress-tabs">
        {tab}
      </Tabs>

      <hr />

      <InterviewNotesForm
        provideFeedback={provideFeedback}
        candidate={candidate}
        push={history.push}
      />
    </Fragment>
  );
};

export default enhance(InterviewProgress);
