import React, { FunctionComponent, useEffect, memo } from 'react';
import FontAwesome from 'react-fontawesome';
import MarkdownRenderer from 'react-markdown-renderer';

import Button from 'react-bootstrap/Button';

import { FlashItem } from './style';
import { FlashMessageType } from '../../propTypes';

enum VariantEnum {
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export type FlashProps = {
  close: () => void;
  message: FlashMessageType;
};

export const Flash: FunctionComponent<FlashProps> = ({ close, message }) => {
  let variant: VariantEnum;

  switch (message.type) {
    case 'error':
      variant = VariantEnum.DANGER;
      break;
    case 'success':
      variant = VariantEnum.SUCCESS;
      break;
    default:
      variant = VariantEnum.WARNING;
  }

  useEffect(() => {
    setTimeout(close, 4000);
  }, [close]);

  return (
    <FlashItem variant={variant}>
      <MarkdownRenderer markdown={message.text} />
      <Button onClick={close} className="close">
        <FontAwesome name="times" />
      </Button>
    </FlashItem>
  );
};

export default memo(Flash);
