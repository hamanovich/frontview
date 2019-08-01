import React, { Component, Fragment } from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import map from 'lodash/map';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import QListForm from '../QList/QListForm';

import { QListType, CandidateType } from '../../propTypes';

class InterviewQLists extends Component {
  static propTypes = {
    userId: string,
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
    userId: null,
    qlists: [],
  };

  state = {
    panel: false,
    isLoaded: false,
  };

  componentWillMount() {
    const { history, location, addFlashMessage, userId } = this.props;

    if (!userId) {
      history.push('/');
      return;
    }

    if (!location.state) {
      addFlashMessage({
        type: 'warn',
        text: 'Before you go next, choose a candidate',
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
          If you decide to create a new QList, don&apos;t forget to add
          questions into it.
        </p>

        <p>
          <Button size="sm" onClick={this.chooseFromList}>
            or choose one
          </Button>
        </p>

        <Card
          id="collapsible-panel-1"
          expanded={this.state.panel}
          onToggle={() => {}}>
          <Form.Group>
            <Form.Label>Choose QList from the list below:</Form.Label>
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
          </Form.Group>
          <Button variant="success" onClick={this.chooseOne}>
            Choose
          </Button>
        </Card>

        <Card
          id="collapsible-panel-2"
          expanded={!this.state.panel}
          onToggle={() => {}}>
          <QListForm userId={userId} />
        </Card>
      </Fragment>
    );
  }
}

export default reduxForm({ form: 'InterviewQLists' })(InterviewQLists);
