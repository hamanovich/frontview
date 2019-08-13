import React, { FunctionComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import Flash from './Flash';
import { deleteFlashMessage } from '../../actions/flash';

import { FlashMessageType } from '../../propTypes';

type FlashListProps = {
  messages: FlashMessageType[];
  deleteFlashMessage: (id: string | undefined) => void;
};

export const FlashList: FunctionComponent<FlashListProps> = ({
  messages,
  deleteFlashMessage,
}) => (
  <Fragment>
    {messages.map((message: FlashMessageType) => (
      <Flash
        key={message.id}
        message={message}
        close={() => deleteFlashMessage(message.id)}
      />
    ))}
  </Fragment>
);

const mapStateToProps = (state: { flash: FlashMessageType[] }) => ({
  messages: state.flash,
});

export default connect(
  mapStateToProps,
  { deleteFlashMessage },
)(FlashList);
