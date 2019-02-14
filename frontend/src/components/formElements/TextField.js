import React from 'react';
import { shape, string, bool } from 'prop-types';

import Form from 'react-bootstrap/Form';

const TextField = ({
  input,
  label,
  placeholder,
  type,
  defaultValue,
  errorState,
  readonly,
  feedback,
  errorsVisible,
  className,
  meta: { touched, error, warning },
}) => (
  <Form.Group>
    {label && <Form.Label htmlFor={`label-${input.name}`}>{label}</Form.Label>}
    <Form.Control
      {...input}
      placeholder={placeholder}
      id={`label-${input.name}`}
      type={type}
      className={className}
      readOnly={readonly}
      isInvalid={(touched && error) || errorState}
      isValid={touched && !error && !errorState}
      value={defaultValue || input.value}
      onBlur={input.onBlur}
    />
    {feedback && <Form.Control.Feedback />}
    {errorsVisible && errorState && (
      <Form.Control.Feedback type="invalid">{errorState}</Form.Control.Feedback>
    )}
    {errorsVisible &&
      touched &&
      ((error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>) ||
        (warning && <Form.Control.Feedback type="invalid">{warning}</Form.Control.Feedback>))}
  </Form.Group>
);

TextField.propTypes = {
  input: shape({
    name: string,
    value: string,
  }).isRequired,
  readonly: bool,
  feedback: bool,
  label: string,
  defaultValue: string,
  placeholder: string,
  className: string,
  type: string.isRequired,
  errorState: string,
  errorsVisible: bool,
  meta: shape({
    touched: bool,
    error: string,
    warning: string,
  }).isRequired,
};

TextField.defaultProps = {
  readonly: false,
  feedback: true,
  errorsVisible: true,
  label: '',
  className: '',
  placeholder: '',
  defaultValue: '',
  errorState: null,
};

export default TextField;
