import React from 'react';
import { func } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

import Navbar from 'react-bootstrap/lib/Navbar';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';

import validate from '../../validations/search';

import { TextField } from '../formElements';

const SForm = styled(Form)`
  @media (max-width: 767px) {
    display: flex;
    width: 100%;

    .form-group {
      flex-grow: 1;
      margin: 0 0.5rem 0 0;
    }
  }
`;

export const SearchForm = ({ handleSubmit, onSearch }) => (
  <Navbar.Form pullLeft>
    <SForm onSubmit={handleSubmit(onSearch)} noValidate>
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
    </SForm>
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
