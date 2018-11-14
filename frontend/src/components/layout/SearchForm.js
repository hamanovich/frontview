import React from 'react';
import { func } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import Navbar from 'react-bootstrap/lib/Navbar';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';

import validate from '../../validations/search';

import { TextField } from '../formElements';

export const SearchForm = ({ handleSubmit, onSearch }) => (
  <Navbar.Form pullLeft>
    <Form onSubmit={handleSubmit(onSearch)} noValidate>
      <Field
        component={TextField}
        type="search"
        htmlFor="search"
        name="search"
        placeholder="Search question"
        feedback={false}
        errorsVisible={false}
      />{' '}
      <Button type="submit">
        <FontAwesome name="search" />
      </Button>
    </Form>
  </Navbar.Form>
);

SearchForm.propTypes = {
  handleSubmit: func.isRequired,
  onSearch: func.isRequired,
};

export default reduxForm({
  form: 'SearchForm',
  validate,
})(SearchForm);
