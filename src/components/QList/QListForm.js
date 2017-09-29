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
    user: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      jobFunction: PropTypes.string,
      primarySkill: PropTypes.string,
      notes: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      gravatar: PropTypes.string
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    qlistAdd: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    errors: {},
    isLoading: false
  };

  onSubmit = (values) => {
    const { qlistAdd, user, reset, addFlashMessage } = this.props;
    const query = { ...values, userId: user._id };

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

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, {
  qlistAdd,
  addFlashMessage
})(reduxForm({
  form: 'qlist',
  validate
})(QListForm));