import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';

import { confirm } from '../../actions/auth';
import { addFlashMessage } from '../../actions/flash';

class Confirmation extends Component {
  static propTypes = {
    confirm: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  state = {
    success: false
  };

  componentDidMount() {
    const { confirm, addFlashMessage, match } = this.props;

    confirm(match.params.token)
      .then(() => this.setState({ success: true }))
      .catch(err =>
        addFlashMessage({
          type: 'error',
          text: err.response.data.errors
        })
      );
  }

  render() {
    const { success } = this.state;
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
      <h1>Hey!</h1>
      <p className="lead text-danger">Bad news. You don&apos;t have full access to this website <b>OR</b> you&apos;ve already confirmed email.</p>
    </Jumbotron>);

    return (
      <div>
        {success ? confirmSuccess : confirmError}
      </div>
    );
  }
}

export default connect(null, { confirm, addFlashMessage })(Confirmation);