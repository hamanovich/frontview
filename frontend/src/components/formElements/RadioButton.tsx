import React, { FunctionComponent } from 'react';

import Form from 'react-bootstrap/Form';
import { RadioButtonProps } from './models';

const RadioButton: FunctionComponent<RadioButtonProps> = ({
  input,
  label,
  options,
  inline,
  meta: { touched, error, warning },
}) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    {options.map(o => (
      <Form.Check
        {...input}
        id={o.value}
        key={o.value}
        value={o.value}
        inline={inline}
        type="radio"
        isInvalid={touched && Boolean(error)}
        isValid={touched && !error}
        label={o.title}
        checked={input.value === o.value}
      />
    ))}
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

RadioButton.defaultProps = {
  inline: false,
};

export default RadioButton;
