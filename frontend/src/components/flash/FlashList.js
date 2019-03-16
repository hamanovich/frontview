import React, { Fragment } from 'react';
import { func, arrayOf, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';

import Flash from './Flash';
import {
  deleteFlashMessage,
  deleteFlashMessages,
} from '../../actions/flash.ts';

export const FlashList = ({ messages, deleteFlashMessage }) => (
  <Fragment>
    {map(messages, message => (
      <Flash
        key={message.id}
        message={message}
        close={() => deleteFlashMessage(message.id)}
      />
    ))}
  </Fragment>
);

FlashList.propTypes = {
  messages: arrayOf(
    shape({
      id: string.isRequired,
      type: string.isRequired,
      text: string.isRequired,
    }),
  ).isRequired,
  deleteFlashMessage: func.isRequired,
};

const mapStateToProps = state => ({ messages: state.flash });

export default connect(
  mapStateToProps,
  { deleteFlashMessage, deleteFlashMessages },
)(FlashList);
