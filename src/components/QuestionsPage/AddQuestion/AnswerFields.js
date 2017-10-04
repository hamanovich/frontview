import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import { TextareaField } from '../../formElements';

const Remove = styled(Button) `
  margin-top: 24px;
`;

const AnswerFields = ({ fields, meta: { touched, error, submitFailed } }) => (
  <div>
    {(touched || submitFailed) && error && <span>{error}</span>}

    {fields.map((answer, index) => (
      <Row key={answer.toString()}>
        <FormGroup>
          <Col xs={10}>
            <Field
              label={`Additional answer ${index + 2}`}
              name={`${answer}.text`}
              component={TextareaField}
              placeholder="Add more answers"
            />
          </Col>

          <Col xs={2}>
            <Remove bsStyle="danger" onClick={() => fields.remove(index)}>
              <FontAwesome name="times" />
            </Remove>
          </Col>
        </FormGroup>
      </Row>
    ))}

    <FormGroup>
      <Button bsStyle="success" onClick={fields.push}>Add Answer</Button>
    </FormGroup>
  </div>
);

const { shape, func, string, bool } = PropTypes;

AnswerFields.propTypes = {
  fields: shape({
    map: func.isRequired,
    push: func.isRequired,
    remove: func.isRequired,
  }).isRequired,
  meta: shape({
    touched: bool,
    error: string,
    submitFailed: bool
  }).isRequired
};

export default AnswerFields;