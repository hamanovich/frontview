import React, { FunctionComponent } from 'react';

import Form from 'react-bootstrap/Form';
import MarkdownSupportedIcon from '../shared/MarkdownSupportedIcon';
import { TextareaFieldProps } from './models';

const TextareaField: FunctionComponent<TextareaFieldProps> = ({
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
  required,
}) => (
  <Form.Group>
    <Form.Label
      htmlFor={`label-${input.name}`}
      className="justify-content-label">
      {required ? (
        <span className="required-field" title="Required field">
          {label}
        </span>
      ) : (
        label
      )}
      <MarkdownSupportedIcon />
    </Form.Label>
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
  required: false,
};

export default TextareaField;
