import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Radio from 'react-bootstrap/lib/Radio';

const RadioButton = ({ input, label, options, inline, meta: { touched, error, warning } }) => (
  <FormGroup validationState={touched && error ? 'error' : touched && !error ? 'success' : null}>
    <ControlLabel>{label}</ControlLabel>
    {map(options, o => (
      <Radio
        {...input}
        id={o.value}
        key={o.value}
        value={o.value}
        inline={inline}
        checked={input.value === o.value}>
        {o.title}
      </Radio>
    ))}
    {touched && ((error && <HelpBlock>{error}</HelpBlock>) || (warning && <span>{warning}</span>))}
  </FormGroup>
);

const { arrayOf, shape, string, bool } = PropTypes;

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
  meta: PropTypes.shape({
    touched: bool,
    error: string,
    warning: string,
  }).isRequired,
};

RadioButton.defaultProps = {
  inline: false,
};

export default RadioButton;
