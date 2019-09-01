import React, { FunctionComponent } from 'react';

import Form from 'react-bootstrap/Form';
import { SelectFieldProps } from './models';

const SelectField: FunctionComponent<SelectFieldProps> = ({
  id,
  input,
  label,
  multiple,
  options,
  meta: { touched, error, warning },
  required = false,
}) => (
  <Form.Group>
    <Form.Label
      htmlFor={id}
      className={required ? 'required-field' : ''}
      title={required ? 'Required field' : ''}>
      {label}
    </Form.Label>
    <Form.Control
      as="select"
      {...input}
      id={id}
      multiple={multiple}
      isInvalid={touched && Boolean(error)}
      isValid={touched && !error}>
      {options.map(o => (
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
