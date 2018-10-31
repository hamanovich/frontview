import React from 'react';
import PropTypes from 'prop-types';

import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

const TextareaField = ({
  input,
  label,
  placeholder,
  rows,
  readonly,
  feedback,
  defaultValue,
  errorsVisible,
  meta: { touched, error, warning },
}) => (
  <FormGroup
    controlId={`label-${input.name}`}
    validationState={touched && error ? 'error' : touched && !error ? 'success' : null}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      {...input}
      componentClass="textarea"
      placeholder={placeholder}
      id={`label-${input.name}`}
      rows={rows}
      readOnly={readonly}
      value={defaultValue || input.value}
    />
    {feedback && <FormControl.Feedback />}
    {errorsVisible &&
      touched &&
      ((error && <HelpBlock>{error}</HelpBlock>) || (warning && <span>{warning}</span>))}
  </FormGroup>
);

const { shape, string, bool, number } = PropTypes;

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
  defaultValue: '',
  placeholder: '',
};

export default TextareaField;
