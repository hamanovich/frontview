import React from 'react';
import { func, shape, string } from 'prop-types';
import FontAwesome from 'react-fontawesome';
import MarkdownRenderer from 'react-markdown-renderer';
import styled from 'styled-components';
import classNames from 'classnames';

import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      setTimeout(this.props.close, 4000);
    },
  }),
);

const FlashItem = styled(Alert)`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  top: 52px;
  align-items: center;
  min-width: 290px;
  max-width: 90%;

  button {
    margin-left: 1.5rem;
  }

  + .alert {
    margin-top: 4rem;

    + .alert {
      margin-top: 12rem;
    }
  }
`;

export const Flash = ({ close, message }) => (
  <FlashItem
    variant={classNames({
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

export default enhance(Flash);
