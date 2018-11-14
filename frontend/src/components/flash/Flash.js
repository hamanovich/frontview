import React from 'react';
import { func, shape, string } from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';

const Flash = ({ close, message }) => (
  <Alert
    bsStyle={classNames({
      danger: message.type === 'error',
      success: message.type === 'success',
      warning: message.type === 'warn',
    })}>
    <span>{message.text}</span>
    <Button onClick={close} className="close">
      <FontAwesome name="times" />
    </Button>
  </Alert>
);

Flash.propTypes = {
  message: shape({
    type: string,
    text: string,
  }).isRequired,
  close: func.isRequired,
};

export default Flash;
