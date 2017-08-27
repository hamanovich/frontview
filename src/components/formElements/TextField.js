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
  handleBlur,
  errorState,
  readonly,
  feedback,
  errorsVisible,
  meta: { touched, error, warning }
}) => (
  <FormGroup
    controlId={`label-${input.name}`}
    validationState={(touched && error) || errorState ? 'error' :
      touched && !error && !errorState ? 'success' : null}
  >
    {label && <ControlLabel>{label}</ControlLabel>}
    <FormControl
      {...input}
      placeholder={placeholder}
      id={`label-${input.name}`}
      type={type}
      readOnly={readonly}
      onBlur={(e) => { handleBlur(e); input.onBlur(e); }}
    />
    {feedback && <FormControl.Feedback />}
    {errorsVisible && errorState &&
      <HelpBlock>{errorState}</HelpBlock>}
    {errorsVisible && touched &&
      ((error && <HelpBlock>{error}</HelpBlock>) ||
        (warning && <span>{warning}</span>))}
  </FormGroup>
);

TextField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }).isRequired,
  readonly: PropTypes.bool,
  feedback: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleBlur: PropTypes.func,
  errorState: PropTypes.string,
  errorsVisible: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  }).isRequired
};

TextField.defaultProps = {
  handleBlur: () => { },
  readonly: false,
  feedback: true,
  errorsVisible: true,
  label: '',
  errorState: null
};

export default TextField;