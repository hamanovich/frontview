import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { resetToken, getReset } from '../../actions/auth';
import { addFlashMessage } from '../../actions/flashMessages';

import ResetForm from './ResetForm';

class ResetPage extends Component {
  static propTypes = {
    getReset: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    resetToken: PropTypes.func.isRequired
  };

  render() {
    const { getReset, addFlashMessage, resetToken } = this.props;

    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <h1>Reset my password</h1>
          <ResetForm
            getReset={getReset}
            addFlashMessage={addFlashMessage}
            resetToken={resetToken} />
        </Col>
      </Row>
    );
  }
}

export default connect(null, { getReset, addFlashMessage, resetToken })(ResetPage);
