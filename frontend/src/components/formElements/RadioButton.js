import React from 'react';
import { arrayOf, shape, string, bool } from 'prop-types';
import map from 'lodash/map';

import Form from 'react-bootstrap/Form';

const RadioButton = ({ input, label, options, inline, meta: { touched, error, warning } }) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    {map(options, o => (
      <Form.Check
        {...input}
        id={o.value}
        key={o.value}
        value={o.value}
        inline={inline}
        type="radio"
        isInvalid={touched && error}
        isValid={touched && !error}
        label={o.title}
        checked={input.value === o.value}
      />
    ))}
    {touched &&
      ((error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>) ||
        (warning && <Form.Control.Feedback type="invalid">{warning}</Form.Control.Feedback>))}
  </Form.Group>
);

RadioButton.propTypes = {
  options: arrayOf(
    shape({
      value: string,
    }),
  ).isRequired,
  input: shape({
    name: string,
    value: string,
  }).isRequired,
  label: string.isRequired,
  inline: bool,
  meta: shape({
    touched: bool,
    error: string,
    warning: string,
  }).isRequired,
};

RadioButton.defaultProps = {
  inline: false,
};

export default RadioButton;
