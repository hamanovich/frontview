import React, { Component, Fragment } from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import map from 'lodash/map';

import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import QListForm from '../QList/QListForm';

import { QListType, CandidateType } from '../../propTypes';

class InterviewQLists extends Component {
  static propTypes = {
    userId: string.isRequired,
    qlists: arrayOf(QListType),
    addFlashMessage: func.isRequired,
    getQLists: func.isRequired,
    history: shape({
      push: func.isRequired,
    }).isRequired,
    location: shape({
      state: CandidateType,
    }).isRequired,
  };

  static defaultProps = {
    qlists: [],
  };

  state = {
    panel: false,
    isLoaded: false,
  };

  componentWillMount() {
    const { history, location, addFlashMessage } = this.props;

    if (!location.state) {
      addFlashMessage({
        type: 'warn',
        text: 'Before you go next, please choose a candidate',
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
      state: { qlist, candidate },
    });
  };

  chooseFromList = () => {
    const { panel, isLoaded } = this.state;
    const { getQLists, userId } = this.props;

    this.setState({ panel: !panel });

    if (!this.state.panel && !isLoaded) {
      getQLists(userId).then(() => this.setState({ isLoaded: true }));
    }
  };

  render() {
    const { qlists, userId } = this.props;
    const chooseQLists = map(qlists, qlist => (
      <option value={qlist._id} key={qlist._id}>
        {qlist.title}
      </option>
    ));

    return (
      <Fragment>
        <h2>Add a QList</h2>

        <p className="text-info">
          If you decide to create new QList. Don&apos;t forget to add questions into it.
        </p>

        <p>
          <Button bsSize="small" onClick={this.chooseFromList}>
            or choose one
          </Button>
        </p>

        <Panel id="collapsible-panel-1" expanded={this.state.panel} onToggle={() => {}}>
          <FormGroup>
            <ControlLabel>Choose QList from the list below:</ControlLabel>
            <Field
              name="qlists"
              component="select"
              className="form-control"
              ref={ref => {
                this.qlistOne = ref;
              }}>
              <option value="">Select a QList...</option>
              {chooseQLists}
            </Field>
          </FormGroup>
          <Button bsStyle="success" onClick={this.chooseOne}>
            Choose
          </Button>
        </Panel>

        <Panel id="collapsible-panel-2" expanded={!this.state.panel} onToggle={() => {}}>
          <QListForm userId={userId} />
        </Panel>
      </Fragment>
    );
  }
}

export default reduxForm({ form: 'InterviewQLists' })(InterviewQLists);
