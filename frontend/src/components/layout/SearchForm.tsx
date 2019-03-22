import React, { FC } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import Button from 'react-bootstrap/Button';

import validate from '../../validations/search';

import { TextField } from '../formElements';

import { SForm } from './style';

type SearchFormProps = {
  onSearch: any;
};

export const SearchForm: FC<
  SearchFormProps & InjectedFormProps<{}, SearchFormProps>
> = ({ handleSubmit, onSearch }) => (
  <SForm
    onSubmit={handleSubmit(onSearch)}
    noValidate
    className="mr-2 form-inline">
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

export default reduxForm<{}, SearchFormProps>({
  form: 'SearchForm',
  validate,
})(SearchForm);
