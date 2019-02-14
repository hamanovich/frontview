import React, { Fragment } from 'react';
import { shape, func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import { TextareaField } from '../../formElements';

const Remove = styled(Button)`
  margin-top: 32px;
`;

const AnswerFields = ({ fields, meta: { touched, error, submitFailed } }) => (
  <Fragment>
    {(touched || submitFailed) && error && <span>{error}</span>}

    {fields.map((answer, index) => (
      <Row key={answer.toString()}>
        <Col xs={{ span: 10 }}>
          <Form.Group>
            <Field
              label={`Additional answer ${index + 2}`}
              name={`${answer}.text`}
              component={TextareaField}
              rows={6}
              placeholder="Add more answers"
            />
          </Form.Group>
        </Col>
        <Col xs={{ span: 2 }}>
          <Remove variant="danger" onClick={() => fields.remove(index)}>
            <FontAwesome name="times" />
          </Remove>
        </Col>
      </Row>
    ))}

    <Form.Group>
      <Button variant="success" onClick={() => fields.push({})}>
        More Answers?
      </Button>
    </Form.Group>
  </Fragment>
);

AnswerFields.propTypes = {
  fields: shape({
    map: func.isRequired,
    push: func.isRequired,
    remove: func.isRequired,
  }).isRequired,
  meta: shape({
    touched: bool,
    error: string,
    submitFailed: bool,
  }).isRequired,
};

export default AnswerFields;
