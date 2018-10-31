import React from 'react';
import PropTypes from 'prop-types';

import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

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
  meta: { touched, error, warning },
}) => (
  <FormGroup
    controlId={`label-${input.name}`}
    validationState={
      (touched && error) || errorState
        ? 'error'
        : touched && !error && !errorState
          ? 'success'
          : null
    }>
    {label && <ControlLabel>{label}</ControlLabel>}
    <FormControl
      {...input}
      placeholder={placeholder}
      id={`label-${input.name}`}
      type={type}
      readOnly={readonly}
      value={defaultValue || input.value}
      onBlur={input.onBlur}
    />
    {feedback && <FormControl.Feedback />}
    {errorsVisible && errorState && <HelpBlock>{errorState}</HelpBlock>}
    {errorsVisible &&
      touched &&
      ((error && <HelpBlock>{error}</HelpBlock>) || (warning && <span>{warning}</span>))}
  </FormGroup>
);

const { shape, string, bool } = PropTypes;

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
  placeholder: '',
  defaultValue: '',
  errorState: null,
};

export default TextField;
