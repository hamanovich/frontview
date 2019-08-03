import React, { FunctionComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import Flash from './Flash';
import { deleteFlashMessage } from '../../actions/flash';

import { Message } from '../../propTypes/Message';
import { FlashListProps } from './models';

export const FlashList: FunctionComponent<FlashListProps> = ({
  messages,
  deleteFlashMessage,
}) => (
  <Fragment>
    {messages.map((message: Message) => (
      <Flash
        key={message.id}
        message={message}
        close={() => deleteFlashMessage(message.id)}
      />
    ))}
  </Fragment>
);

const mapStateToProps = (state: { flash: Message[] }) => ({
  messages: state.flash,
});

export default connect(
  mapStateToProps,
  { deleteFlashMessage },
)(FlashList);
