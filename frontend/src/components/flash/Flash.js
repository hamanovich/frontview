import React from 'react';
import { func, shape, string } from 'prop-types';
import FontAwesome from 'react-fontawesome';
import MarkdownRenderer from 'react-markdown-renderer';
import styled from 'styled-components';
import classNames from 'classnames';

import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';

const FlashItem = styled(Alert)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Flash = ({ close, message }) => (
  <FlashItem
    bsStyle={classNames({
      danger: message.type === 'error',
      success: message.type === 'success',
      warning: message.type === 'warn',
    })}>
    <MarkdownRenderer markdown={message.text} />
    <Button onClick={close} className="close">
      <FontAwesome name="times" />
    </Button>
  </FlashItem>
);

Flash.propTypes = {
  message: shape({
    type: string,
    text: string,
  }).isRequired,
  close: func.isRequired,
};

export default Flash;
