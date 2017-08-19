import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';

import Flash from './Flash';
import { deleteFlashMessage, deleteFlashMessages } from '../../actions/flashMessages';

class FlashList extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessages: PropTypes.func.isRequired
  };

  render() {
    const { deleteFlashMessage, messages } = this.props;
    const flashMessages = map(messages, message =>
      <Flash key={message.id} message={message} close={() => deleteFlashMessage(message.id)} />
    );

    return (
      <div>
        {flashMessages}
      </div>
    );
  }
}

const mapStateToProps = state => ({ messages: state.flashMessages });

export default connect(mapStateToProps, { deleteFlashMessage, deleteFlashMessages })(FlashList);
