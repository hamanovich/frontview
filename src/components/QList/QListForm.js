import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import { TextField, TextareaField } from '../formElements';

import { qlistAdd } from '../../actions/qlists';
import { addFlashMessage } from '../../actions/flash';

import validate from '../../validations/qlist';

class QListForm extends Component {
  static propTypes = {
    userId: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    qlistAdd: PropTypes.func.isRequired
  };

  static defaultProps = {
    userId: ''
  };

  state = {
    errors: {},
    isLoading: false
  };

  onSubmit = (values) => {
    const { qlistAdd, userId, reset, addFlashMessage } = this.props;
    const query = { ...values, userId };

    this.setState({ errors: {}, isLoading: true });

    qlistAdd(query)
      .then(() => {
        reset();
        this.setState({ isLoading: false });

        addFlashMessage({
          type: 'success',
          text: `QLists ${values.title} has created`
        });
      })
      .catch(() => this.setState({ isLoading: false }));
  };

  render() {
    const { isLoading } = this.state;
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
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
  }
}

export default connect(null, {
  qlistAdd,
  addFlashMessage
})(reduxForm({
  form: 'QListForm',
  validate
})(QListForm));