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
  meta: { touched, error, warning }
}) => (
    <FormGroup
      controlId={input.name}
      validationState={touched && error ? 'error' :
        touched && !error ? 'success' : null}>
      <ControlLabel>{label}</ControlLabel>
      <select
        {...input}
        id={id}
        multiple={multiple}
        className="form-control"
      >
        {map(options, o =>
          <option value={o.value} key={o.value}>{o.title}</option>
        )}
      </select>
      {touched &&
        ((error && <HelpBlock>{error}</HelpBlock>) ||
          (warning && <span>{warning}</span>))}
    </FormGroup>
  );

SelectField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.array
  }).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  }).isRequired
};

export default SelectField;
