import React, { FC } from 'react';

import Form from 'react-bootstrap/Form';
import { TextareaFieldProps } from './models';

const TextareaField: FC<TextareaFieldProps> = ({
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
      isInvalid={touched && Boolean(error)}
      isValid={touched && !error}
      value={defaultValue || input.value}
    />
    {feedback && <Form.Control.Feedback />}
    {errorsVisible &&
      touched &&
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
