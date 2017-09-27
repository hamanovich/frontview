import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import map from 'lodash/map';

import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Form from 'react-bootstrap/lib/Form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import validate from '../../validations/candidate';

import TextField from '../formElements/TextField';
import TextareaField from '../formElements/TextareaField';

class InterviewCandidates extends Component {
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
    candidates: PropTypes.array,
    candidateAdd: PropTypes.func.isRequired,
    getCandidates: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  static defaultProps = {
    candidates: []
  };

  state = {
    candidatePanel: false,
    candidatesLoaded: false,
    isLoading: false
  };

  // chooseOne = () => {
  // this.props.getCandidateById(this.candidateOne.value);
  // this.context.router.push('/interview/step-2');
  // };

  onSubmit = (values) => {
    const { candidateAdd, addFlashMessage, user, reset } = this.props;
    const query = { ...values, userId: user._id };

    this.setState({ errors: {}, isLoading: true });

    candidateAdd(query)
      .then(() => {
        reset();

        addFlashMessage({
          type: 'success',
          text: `Candidate ${values.firstName} ${values.lastName} has created`
        });

        this.setState({
          isLoading: false,
          candidatePanel: !this.state.candidatePanel
        });
      })
      .catch(() => this.setState({ isLoading: false }));
  };

  chooseFromList = () => {
    const { candidatePanel, candidatesLoaded } = this.state;
    const { getCandidates, user } = this.props;

    this.setState({ candidatePanel: !candidatePanel });
    if (!this.state.candidatePanel && !candidatesLoaded) {
      getCandidates(user._id).then(
        () => this.setState({ candidatesLoaded: true }),
        err => this.setState({ errors: err.response.data })
      );
    }
  };

  render() {
    const { isLoading } = this.state;
    const { candidates, handleSubmit } = this.props;
    const chooseCandidates = map(candidates, candidate =>
      (<option
        value={candidate._id}
        key={candidate._id}
      >{candidate.firstName} {candidate.lastName} - {candidate.primarySkill} ({candidate.techLevel})</option>));

    return (
      <div>
        <h2>Add a Candidate</h2>
        <div>
          <p>
            <Button bsSize="small" onClick={this.chooseFromList}>
              or choose one
          </Button>
          </p>
          <Panel collapsible expanded={this.state.candidatePanel}>
            <FormGroup>
              <ControlLabel>Choose candidate from the list below:</ControlLabel>
              <Field
                name="candidates"
                id="candidates"
                component="select"
                className="form-control"
                ref={(ref) => { this.candidateOne = ref; }}
              >
                <option value="">Select a candidate...</option>
                {chooseCandidates}
              </Field>
            </FormGroup>
            <Button
              bsSize="small"
              bsStyle="success"
              onClick={this.chooseOne}
            >Choose</Button>
          </Panel>
        </div>

        <Panel collapsible expanded={!this.state.candidatePanel}>
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
              component={TextareaField}
              placeholder="Add some notes (optional)"
            />

            <Button
              type="submit"
              bsStyle="primary"
              bsSize="large"
              disabled={isLoading}
            >Register a candidate</Button>
          </Form>
        </Panel>
      </div>
    );
  }
}

export default reduxForm({
  form: 'InterviewCandidates',
  validate
})(InterviewCandidates);