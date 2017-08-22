import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';

const Flash = ({ close, message }) => (
  <Alert bsStyle={message.type === 'error' ? 'danger' : 'success'}>
    {message.text}
    <Button onClick={close} className="close">
      <FontAwesome name="times" />
    </Button>
  </Alert>
);

Flash.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string
  }).isRequired,
  close: PropTypes.func.isRequired
};

export default Flash;
