import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import { TextField, TextareaField } from '../formElements';

import { qlistAdd } from '../../actions/qlists';

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
    const { qlistAdd, user, reset } = this.props;
    const query = { ...values, userId: user._id };

    this.setState({ errors: {}, isLoading: true });

    qlistAdd(query)
      .then(() => {
        reset();
        this.setState({ isLoading: false });
      })
      .catch(() => this.setState({ isLoading: false }));
  };

  render() {
    const { isLoading } = this.state;
    const { handleSubmit } = this.props;

    return (
      <div>
        <PageHeader>
          <FontAwesome name="list-ul" /> Create new Question&apos;s List (QList)
        </PageHeader>

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
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, {
  qlistAdd
})(reduxForm({
  form: 'qlist',
  validate
})(QListForm));