import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';

import Flash from './Flash';
import { deleteFlashMessage, deleteFlashMessages } from '../../actions/flash';

const FlashList = ({ messages, deleteFlashMessage }) => (
  <div>{map(messages, message => (
    <Flash
      key={message.id}
      message={message}
      close={() => deleteFlashMessage(message.id)}
    />)
  )}</div>
);

FlashList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ messages: state.flash });

export default connect(mapStateToProps, { deleteFlashMessage, deleteFlashMessages })(FlashList);