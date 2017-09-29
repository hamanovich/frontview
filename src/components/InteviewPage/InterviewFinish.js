import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MarkdownRenderer from 'react-markdown-renderer';
import FontAwesome from 'react-fontawesome';

import Well from 'react-bootstrap/lib/Well';

class InterviewFinish extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.object
    }).isRequired,
  };

  componentWillMount() {
    const { history, location } = this.props;

    if (!location.state) {
      history.push('/');
    }
  }

  render() {
    const { state } = this.props.location;

    return (
      <div>
        {state && <div>
          <h2>Feedback on {state.candidate.firstName} {state.candidate.lastName}:</h2>
          <Well className="text-left">
            <MarkdownRenderer markdown={state.feedback.result} />
          </Well>
          <p><Link to="/"><FontAwesome name="home" /> Go to the home page</Link></p>
        </div>}
      </div>
    );
  }
}

export default InterviewFinish;