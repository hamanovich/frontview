import React, { FC } from 'react';
import map from 'lodash/map';

import Form from 'react-bootstrap/Form';
import { SelectFieldProps } from './models';

const SelectField: FC<SelectFieldProps> = ({
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
      isInvalid={touched && Boolean(error)}
      isValid={touched && !error}>
      {map(options, o => (
        <option value={o.value} key={o.value}>
          {o.title}
        </option>
      ))}
    </Form.Control>
    {touched &&
      ((error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )) ||
        (warning && (
          <Form.Control.Feedback type="invalid">
            {warning}
          </Form.Control.Feedback>
        )))}
  </Form.Group>
);

export default SelectField;
