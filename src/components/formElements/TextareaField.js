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
  meta: { touched, error, warning }
}) => (
  <FormGroup
    controlId={`label-${input.name}`}
    validationState={touched && error ? 'error' :
      touched && !error ? 'success' : null}>
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
    {errorsVisible && touched &&
      ((error && <HelpBlock>{error}</HelpBlock>) ||
        (warning && <span>{warning}</span>))}
  </FormGroup>
);

TextareaField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }).isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  readonly: PropTypes.bool,
  feedback: PropTypes.bool,
  placeholder: PropTypes.string,
  errorsVisible: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  }).isRequired,
  rows: PropTypes.number
};

TextareaField.defaultProps = {
  rows: null,
  readonly: false,
  feedback: true,
  errorsVisible: true,
  defaultValue: '',
  placeholder: ''
};

export default TextareaField;