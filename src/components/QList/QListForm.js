import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import { TextField, TextareaField } from '../formElements';

import { qlistAdd } from '../../actions/qlists';
import { addFlashMessage } from '../../actions/flash';

import validate from '../../validations/qlist';

const enhance = compose(
  connect(null, {
    qlistAdd,
    addFlashMessage
  }),

  reduxForm({
    form: 'QListForm',
    validate
  }),

  withState('isLoading', 'setLoading', false),

  withHandlers({
    onSubmit: props => (values) => {
      const { qlistAdd, userId, reset, addFlashMessage, setLoading } = props;
      const query = { ...values, userId };

      setLoading(true);

      qlistAdd(query)
        .then(() => {
          reset();
          setLoading(false);

          addFlashMessage({
            type: 'success',
            text: `QLists ${values.title} has created`
          });
        })
        .catch(() => setLoading(false));
    }
  })
);

const QListForm = ({ isLoading, handleSubmit, onSubmit }) => (
  <Form onSubmit={handleSubmit(onSubmit)} noValidate>
    <Field
      label="Title*:"
      component={TextField}
      type="text"
      name="title"
      placeholder="Come up with a list title"
    />

    <Field
      label="Notes"
      name="notes"
      component={TextareaField}
      rows={6}
      placeholder="Add some notes, if needed"
    />

    <Button
      type="submit"
      bsStyle="primary"
      bsSize="large"
      disabled={isLoading}
    >Create</Button>
  </Form>
);

const { func, bool } = PropTypes;

QListForm.propTypes = {
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  isLoading: bool.isRequired
};

export default enhance(QListForm);