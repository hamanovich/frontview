import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import { TextareaField } from '../formElements';

import validate from '../../validations/interviewNotes';

const enhance = compose(
  reduxForm({
    form: 'InterviewNotesForm',
    validate,
  }),

  withHandlers({
    onSubmit: props => feedback => {
      const { provideFeedback, candidate, push } = props;

      provideFeedback(candidate._id, feedback);

      push({
        pathname: '/interview/finish',
        state: { feedback, candidate },
      });
    },
  }),
);

const InterviewNotesForm = ({ handleSubmit, onSubmit }) => (
  <Form onSubmit={handleSubmit(onSubmit)} noValidate>
    <Field
      label="Private notes:"
      name="result"
      component={TextareaField}
      rows={6}
      placeholder="Add notes about how it is going"
    />

    <HelpBlock>Before Finish be sure that you asked all questions!</HelpBlock>

    <Button type="submit" bsStyle="primary" bsSize="large">
      Finish Interview
    </Button>
  </Form>
);

const { func } = PropTypes;

InterviewNotesForm.propTypes = {
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
};

export default enhance(InterviewNotesForm);
