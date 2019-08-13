import React, { FunctionComponent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FontAwesome from 'react-fontawesome';
import { TextFieldProps } from './models';

const TextField: FunctionComponent<TextFieldProps> = ({
  input,
  label = '',
  placeholder = '',
  type,
  defaultValue = '',
  errorState = null,
  readonly = false,
  feedback = true,
  errorsVisible = true,
  className = '',
  meta: { touched, error, warning },
}) => {
  const [activeType, setType] = useState<string>(type);

  const onTogglePasswordView = () => {
    setType(activeType === type ? 'text' : type);
  };

  const FormControl = (controlType: string = type) => (
    <Form.Control
      {...input}
      placeholder={placeholder}
      id={`label-${input.name}`}
      type={controlType}
      className={className}
      readOnly={readonly}
      isInvalid={(touched && Boolean(error)) || Boolean(errorState)}
      isValid={touched && !error && !errorState}
      value={defaultValue || input.value}
      onBlur={input.onBlur}
    />
  );

  return (
    <Form.Group>
      {label && (
        <Form.Label htmlFor={`label-${input.name}`} column={false}>
          {label}
        </Form.Label>
      )}
      {type === 'password' ? (
        <InputGroup>
          {FormControl(activeType)}
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={onTogglePasswordView}
              title={activeType === type ? 'Show' : 'Hide'}>
              <FontAwesome name={activeType === type ? 'eye' : 'eye-slash'} />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      ) : (
        FormControl()
      )}
      {feedback && <Form.Control.Feedback />}
      {errorsVisible && errorState && (
        <Form.Control.Feedback type="invalid">
          {errorState}
        </Form.Control.Feedback>
      )}
      {errorsVisible &&
        touched &&
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
};

export default TextField;
