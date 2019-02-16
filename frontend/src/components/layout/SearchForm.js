import React from 'react';
import { func } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import validate from '../../validations/search';

import { TextField } from '../formElements';

const SForm = styled(Form)`
  .form-control.is-invalid,
  .form-control.is-valid {
    background-image: none;
    padding-right: 0.75rem;
  }

  @media (max-width: 767px) {
    display: flex;
    width: 100%;
    padding-top: 1rem;

    .form-group {
      flex-grow: 1;

      input {
        width: 100%;
      }
    }
  }
`;

export const SearchForm = ({ handleSubmit, onSearch }) => (
  <SForm onSubmit={handleSubmit(onSearch)} noValidate inline className="mr-auto">
    <Field
      component={TextField}
      type="search"
      htmlFor="search"
      name="search"
      placeholder="Search question"
      className="mr-sm-2"
      feedback={false}
      errorsVisible={false}
    />{' '}
    <Button type="submit">
      <FontAwesome name="search" />
    </Button>
  </SForm>
);

SearchForm.propTypes = {
  handleSubmit: func.isRequired,
  onSearch: func.isRequired,
};

export default reduxForm({
  form: 'SearchForm',
  validate,
})(SearchForm);
