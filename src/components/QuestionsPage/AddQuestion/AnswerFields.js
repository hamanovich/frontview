import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import { TextareaField } from '../../formElements';

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
            <Button bsStyle="danger" onClick={() => fields.remove(index)} style={{ marginTop: 24 }}>&times;</Button>
          </Col>
        </FormGroup>
      </Row>
    ))}

    <FormGroup>
      <Button bsStyle="success" onClick={() => fields.push()}>Add Answer</Button>
    </FormGroup>
  </div>
);

AnswerFields.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    submitFailed: PropTypes.bool
  }).isRequired
};

export default AnswerFields;