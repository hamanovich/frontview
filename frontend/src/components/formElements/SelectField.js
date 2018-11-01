import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

const SelectField = ({
  id,
  input,
  label,
  multiple,
  options,
  size,
  meta: { touched, error, warning },
}) => (
  <FormGroup
    controlId={input.name}
    validationState={touched && error ? 'error' : touched && !error ? 'success' : null}>
    <ControlLabel>{label}</ControlLabel>
    <select {...input} id={id} size={size} multiple={multiple} className="form-control">
      {map(options, o => (
        <option value={o.value} key={o.value}>
          {o.title}
        </option>
      ))}
    </select>
    {touched && ((error && <HelpBlock>{error}</HelpBlock>) || (warning && <span>{warning}</span>))}
  </FormGroup>
);

const { arrayOf, number, shape, string, bool } = PropTypes;

SelectField.propTypes = {
  input: shape({
    name: string,
    value: arrayOf(string),
  }).isRequired,
  id: string.isRequired,
  label: string.isRequired,
  multiple: bool.isRequired,
  size: number,
  options: arrayOf(
    shape({
      value: string,
      title: string,
    }),
  ).isRequired,
  meta: shape({
    touched: bool,
    error: string,
    warning: string,
  }).isRequired,
};

SelectField.defaultProps = {
  size: 4,
};

export default SelectField;
