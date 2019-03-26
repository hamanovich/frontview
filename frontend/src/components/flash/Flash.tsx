import React, { FC, ReactNode } from 'react';
import FontAwesome from 'react-fontawesome';
import MarkdownRenderer from 'react-markdown-renderer';

import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

import Button from 'react-bootstrap/Button';

import { FlashProps } from './models';

import { FlashItem } from './style';

const enhance = compose<FlashProps, FlashProps>(
  lifecycle<FlashProps, {}>({
    componentDidMount() {
      setTimeout(this.props.close, 4000);
    },
  }),
);

export const Flash: FC<FlashProps> = ({ close, message }) => {
  const variant =
    message.type === 'error'
      ? 'danger'
      : message.type === 'success'
      ? 'success'
      : 'warning';
  return (
    <FlashItem variant={variant}>
      <MarkdownRenderer markdown={message.text} />
      <Button onClick={close} className="close">
        <FontAwesome name="times" />
      </Button>
    </FlashItem>
  );
};

export default enhance(Flash);
