import React, { FunctionComponent } from 'react';

import Form from 'react-bootstrap/Form';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
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
}) => (
  <Form.Group>
    <Form.Label
      htmlFor={`label-${input.name}`}
      className="justify-content-label">
      {label}
      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip id="tooltip-top-md">
            Styling with Markdown is supported
          </Tooltip>
        }>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="#000000">
          <path d="M22,4H2C0.897,4,0,4.897,0,6v12c0,1.103,0.897,2,2,2h20c1.103,0,2-0.897,2-2V6C24,4.897,23.103,4,22,4z M12,16h-2v-4.324 L9.375,13h-1.75L7,11.676V16H5V8h2l1.5,3.059L10,8h2V16z M17,16l-3-4h2V8h2v4h2L17,16z" />
        </svg>
      </OverlayTrigger>
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
};

export default TextareaField;
