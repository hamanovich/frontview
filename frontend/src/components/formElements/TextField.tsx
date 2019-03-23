import React, { FC } from 'react';
import { shape, string, bool } from 'prop-types';

import Form from 'react-bootstrap/Form';
import { TextFieldProps } from './models';

const TextField: FC<TextFieldProps> = ({
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
      isInvalid={(touched && Boolean(error)) || Boolean(errorState)}
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
