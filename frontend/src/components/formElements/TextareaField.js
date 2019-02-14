import React from 'react';
import { shape, string, bool, number } from 'prop-types';

import Form from 'react-bootstrap/Form';

const TextareaField = ({
  input,
  label,
  placeholder,
  rows,
  readonly,
  className,
  feedback,
  defaultValue,
  errorsVisible,
  meta: { touched, error, warning },
}) => (
  <Form.Group>
    <Form.Label htmlFor={`label-${input.name}`}>{label}</Form.Label>
    <Form.Control
      {...input}
      as="textarea"
      placeholder={placeholder}
      id={`label-${input.name}`}
      rows={rows}
      className={className}
      readOnly={readonly}
      isInvalid={touched && error}
      isValid={touched && !error}
      value={defaultValue || input.value}
    />
    {feedback && <Form.Control.Feedback />}
    {errorsVisible &&
      touched &&
      ((error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>) ||
        (warning && <Form.Control.Feedback type="invalid">{warning}</Form.Control.Feedback>))}
  </Form.Group>
);

TextareaField.propTypes = {
  input: shape({
    name: string,
    value: string,
  }).isRequired,
  label: string.isRequired,
  defaultValue: string,
  readonly: bool,
  feedback: bool,
  placeholder: string,
  className: string,
  errorsVisible: bool,
  meta: shape({
    touched: bool,
    error: string,
    warning: string,
  }).isRequired,
  rows: number,
};

TextareaField.defaultProps = {
  rows: null,
  readonly: false,
  feedback: true,
  errorsVisible: true,
  className: '',
  defaultValue: '',
  placeholder: '',
};

export default TextareaField;
