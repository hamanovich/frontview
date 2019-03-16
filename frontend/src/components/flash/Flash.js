import React from 'react';
import { func, shape, string } from 'prop-types';
import FontAwesome from 'react-fontawesome';
import MarkdownRenderer from 'react-markdown-renderer';

import classNames from 'classnames';

import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

import Button from 'react-bootstrap/Button';

import { FlashItem } from './style.ts';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      setTimeout(this.props.close, 4000);
    },
  }),
);

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
