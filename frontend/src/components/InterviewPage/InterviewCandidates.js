import React, { Component, Fragment } from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import map from 'lodash/map';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import validate from '../../validations/candidate';

import TextField from '../formElements/TextField';
import TextareaField from '../formElements/TextareaField';

import { CandidateType } from '../../propTypes';

class InterviewCandidates extends Component {
  static propTypes = {
    userId: string,
    candidates: arrayOf(CandidateType),
    candidateAdd: func.isRequired,
    getCandidates: func.isRequired,
    addFlashMessage: func.isRequired,
    handleSubmit: func.isRequired,
    reset: func.isRequired,
    history: shape({
      push: func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    userId: null,
    candidates: [],
  };

  state = {
    panel: false,
    isLoaded: false,
    isLoading: false,
  };

  onSubmit = values => {
    const { candidateAdd, addFlashMessage, userId, reset } = this.props;
    const query = { ...values, userId };

    this.setState({ isLoading: true });

    candidateAdd(query)
      .then(() => {
        reset();

        addFlashMessage({
          type: 'success',
          text: `Candidate ${values.firstName} ${values.lastName} has created`,
        });

        this.setState(prevState => ({ isLoading: false, panel: !prevState.panel }));
      })
      .catch(() => this.setState({ isLoading: false }));
  };

  chooseOne = () => {
    const { history, candidates } = this.props;
    const candidate = candidates.find(candidate => candidate._id === this.candidateOne.value);

    history.push({
      pathname: '/interview/qlists',
      state: candidate,
    });
  };

  chooseFromList = () => {
    const { panel, isLoaded } = this.state;
    const { getCandidates, userId } = this.props;

    this.setState({ panel: !panel });

    if (!panel && !isLoaded) {
      getCandidates(userId).then(() => this.setState({ isLoaded: true }));
    }
  };

  render() {
    const { isLoading } = this.state;
    const { candidates, handleSubmit } = this.props;
    const chooseCandidates = map(candidates, candidate => (
      <option value={candidate._id} key={candidate._id}>
        {candidate.firstName} {candidate.lastName} - {candidate.primarySkill} ({candidate.techLevel}
        )
      </option>
    ));

    return (
      <Fragment>
        <h2>Add a Candidate</h2>
        <p>
          <Button size="sm" onClick={this.chooseFromList}>
            or choose one
          </Button>
        </p>

        <Card id="collapsible-panel-1" expanded={this.state.panel} onToggle={() => {}}>
          <Card.Collapse>
            <Card.Body>
              <Form.Group>
                <Form.Label>Choose candidate from the list below:</Form.Label>
                <Field
                  name="candidates"
                  component="select"
                  className="form-control"
                  ref={ref => {
                    this.candidateOne = ref;
                  }}>
                  <option value="">Select a candidate...</option>
                  {chooseCandidates}
                </Field>
              </Form.Group>
              <Button variant="success" onClick={this.chooseOne}>
                Choose
              </Button>
            </Card.Body>
          </Card.Collapse>
        </Card>

        <Card
          id="collapsible-panel-2"
          expanded={!this.state.panel}
          defaultExpanded
          onToggle={() => {}}>
          <Card.Collapse>
            <Card.Body>
              <Form onSubmit={handleSubmit(this.onSubmit)} noValidate>
                <Row>
                  <Col sm={6}>
                    <Field
                      label="First name:"
                      component={TextField}
                      type="text"
                      name="firstName"
                      placeholder="Candidate's first name"
                    />
                  </Col>

                  <Col sm={6}>
                    <Field
                      label="Last name:"
                      component={TextField}
                      type="text"
                      name="lastName"
                      placeholder="Candidate's surname"
                    />
                  </Col>
                </Row>

                <Field
                  label="Email:"
                  component={TextField}
                  type="email"
                  name="email"
                  placeholder="Add email (optional)"
                />

                <Row>
                  <Col sm={6}>
                    <Field
                      label="Primary skill:"
                      component={TextField}
                      type="text"
                      name="primarySkill"
                      placeholder="Add Primary Skill"
                    />
                  </Col>

                  <Col sm={6}>
                    <Field
                      label="Technical Level:"
                      component={TextField}
                      type="text"
                      name="techLevel"
                      placeholder="Add Technical Level"
                    />
                  </Col>
                </Row>

                <Field
                  label="Notes"
                  name="notes"
                  rows={6}
                  component={TextareaField}
                  placeholder="Add some notes (optional)"
                />

                <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
                  Register a candidate
                </Button>
              </Form>
            </Card.Body>
          </Card.Collapse>
        </Card>
      </Fragment>
    );
  }
}

export default reduxForm({
  form: 'InterviewCandidates',
  validate,
})(InterviewCandidates);
