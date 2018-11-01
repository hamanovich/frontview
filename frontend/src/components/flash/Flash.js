import React from 'react';
import PropTypes from 'prop-types';
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
    {message.text}
    <Button onClick={close} className="close">
      <FontAwesome name="times" />
    </Button>
  </Alert>
);

const { func, shape, string } = PropTypes;

Flash.propTypes = {
  message: shape({
    type: string,
    text: string,
  }).isRequired,
  close: func.isRequired,
};

export default Flash;