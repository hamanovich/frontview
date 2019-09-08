import React, { FunctionComponent, Fragment } from 'react';
import { Field } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import { TextareaField } from '../../formElements';
import { Remove } from '../style';

type AnswerFieldsProps = {
  fields: {
    map: any;
    push: (answer?: any) => void;
    remove: any;
  };
  meta: {
    touched: boolean;
    error: string;
    submitFailed: boolean;
  };
};

const AnswerFields: FunctionComponent<AnswerFieldsProps> = ({
  fields,
  meta: { touched, error, submitFailed },
}) => (
  <Fragment>
    {(touched || submitFailed) && error && <span>{error}</span>}

    {fields.map((answer: { text: string }, index: number) => (
      <Row key={answer.toString()}>
        <Col xs={{ span: 10 }}>
          <Form.Group>
            <Field
              label={`Additional answer ${index + 2}`}
              name={`${answer}.text`}
              component={TextareaField}
              rows={6}
              required
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

export default AnswerFields;
