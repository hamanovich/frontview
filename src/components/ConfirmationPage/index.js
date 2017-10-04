import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';

import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';

import { confirm } from '../../actions/auth';
import { addFlashMessage } from '../../actions/flash';

const enhance = compose(
  connect(null, {
    confirm,
    addFlashMessage
  }),

  withState('success', 'setState', false),

  lifecycle({
    componentDidMount() {
      const { confirm, addFlashMessage, match, setState } = this.props;

      confirm(match.params.token)
        .then(() => setState({ success: true }))
        .catch(err =>
          addFlashMessage({
            type: 'error',
            text: err.response.data.error
          })
        );
    }
  })
);

const confirmSuccess = (<Jumbotron>
  <h1>Hey!</h1>
  <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
  <hr />
  <p className="lead">
    <Link to="/">
      <Button bsStyle="success">Welcome on board!</Button>
    </Link>
  </p>
</Jumbotron>);

const confirmError = (<Jumbotron>
  <h1>Ooops!</h1>
  <p className="lead text-danger">Bad news. You don&apos;t have full access to this website <b>OR</b> you&apos;ve already confirmed email.</p>
</Jumbotron>);

const Confirmation = ({ success }) =>
  success ?
    confirmSuccess :
    confirmError;

Confirmation.propTypes = {
  success: PropTypes.bool.isRequired
};

export default enhance(Confirmation);