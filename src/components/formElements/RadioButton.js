import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Radio from 'react-bootstrap/lib/Radio';

const RadioButton = ({
  input,
  label,
  options,
  meta: { touched, error, warning }
}) => (
  <FormGroup validationState={touched && error ? 'error' : touched && !error ? 'success' : null}>
    <ControlLabel>{label}</ControlLabel>
    {map(options, o => (
      <Radio
        {...input}
        id={o.value}
        key={o.value}
        value={o.value}
        checked={input.value === o.value}
      >
        {o.title}
      </Radio>
    )
    )}
    {touched &&
      ((error && <HelpBlock>{error}</HelpBlock>) ||
        (warning && <span>{warning}</span>))}
  </FormGroup>
);

RadioButton.propTypes = {
  options: PropTypes.array.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  }).isRequired
};

export default RadioButton;