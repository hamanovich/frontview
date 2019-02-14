import React from 'react';
import { arrayOf, shape, string, bool } from 'prop-types';
import map from 'lodash/map';

import Form from 'react-bootstrap/Form';

const SelectField = ({
  id,
  input,
  label,
  multiple,
  options,
  meta: { touched, error, warning },
}) => (
  <Form.Group>
    <Form.Label htmlFor={id}>{label}</Form.Label>
    <Form.Control
      as="select"
      {...input}
      id={id}
      multiple={multiple}
      isInvalid={touched && error}
      isValid={touched && !error}>
      {map(options, o => (
        <option value={o.value} key={o.value}>
          {o.title}
        </option>
      ))}
    </Form.Control>
    {touched &&
      ((error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>) ||
        (warning && <Form.Control.Feedback type="invalid">{warning}</Form.Control.Feedback>))}
  </Form.Group>
);

SelectField.propTypes = {
  input: shape({
    name: string,
    value: arrayOf(string),
  }).isRequired,
  id: string.isRequired,
  label: string.isRequired,
  multiple: bool.isRequired,
  options: arrayOf(
    shape({
      value: string,
      title: string,
    }),
  ).isRequired,
  meta: shape({
    touched: bool,
    error: string,
    warning: string,
  }).isRequired,
};

export default SelectField;
