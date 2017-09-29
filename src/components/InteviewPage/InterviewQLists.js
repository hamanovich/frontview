import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import map from 'lodash/map';

import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import QListForm from '../QList/QListForm';

class InterviewQLists extends Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      jobFunction: PropTypes.string,
      primarySkill: PropTypes.string,
      notes: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      gravatar: PropTypes.string
    }).isRequired,
    qlists: PropTypes.array,
    addFlashMessage: PropTypes.func.isRequired,
    getQLists: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.object
    }).isRequired
  };

  static defaultProps = {
    qlists: []
  };

  state = {
    panel: false,
    isLoaded: false,
    isLoading: false
  };

  componentWillMount() {
    const { history, location, addFlashMessage } = this.props;

    if (!location.state) {
      addFlashMessage({
        type: 'warn',
        text: 'Before you go next, please choose a candidate'
      });

      history.push('/interview/candidates');
    }
  }

  chooseOne = () => {
    const { history, qlists, location } = this.props;
    const qlist = qlists.find(qlist => qlist._id === this.qlistOne.value);
    const candidate = location.state;

    history.push({
      pathname: '/interview/progress',
      state: { qlist, candidate }
    });
  };

  chooseFromList = () => {
    const { panel, isLoaded } = this.state;
    const { getQLists, user } = this.props;

    this.setState({ panel: !panel });

    if (!this.state.panel && !isLoaded) {
      getQLists(user._id)
        .then(() => this.setState({ isLoaded: true }))
        .catch(err => this.setState({ errors: err.response.data }));
    }
  };

  render() {
    const { qlists } = this.props;
    const chooseQLists = map(qlists, qlist => (<option
      value={qlist._id}
      key={qlist._id}
    >{qlist.title}</option>));

    return (
      <div>
        <h2>Add a QList</h2>
        <div>
          <p>
            <Button bsSize="small" onClick={this.chooseFromList}>
              or choose one
            </Button>
          </p>
          <Panel collapsible expanded={this.state.panel}>
            <FormGroup>
              <ControlLabel>Choose QList from the list below:</ControlLabel>
              <Field
                name="qlists"
                id="qlistss"
                component="select"
                className="form-control"
                ref={(ref) => { this.qlistOne = ref; }}
              >
                <option value="">Select a QList...</option>
                {chooseQLists}
              </Field>
            </FormGroup>
            <Button
              bsStyle="success"
              onClick={this.chooseOne}
            >Choose</Button>
          </Panel>
        </div>

        <Panel collapsible expanded={!this.state.panel}>
          <QListForm />
        </Panel>
      </div>
    );
  }
}

export default reduxForm({ form: 'InterviewQLists' })(InterviewQLists);