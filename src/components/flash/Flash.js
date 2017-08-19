import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const Flash = ({ close, message }) => (
  <Alert bsStyle={message.type === 'error' ? 'danger' : 'success'}>
    {message.text}
    <Button onClick={close} className="close">
      <Glyphicon glyph="remove" />
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
