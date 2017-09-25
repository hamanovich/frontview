import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';
import map from 'lodash/map';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import { voteQuestion } from '../../actions/questions';
import { qlistAddQuestion, getQLists } from '../../actions/qlists';

class Toolbar extends Component {
  static propTypes = {
    size: PropTypes.string,
    user: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    qlists: PropTypes.array.isRequired,
    qlistAddQuestion: PropTypes.func.isRequired,
    getQLists: PropTypes.func.isRequired,
    voteQuestion: PropTypes.func.isRequired
  };

  static defaultProps = {
    size: 'small'
  };

  componentDidMount() {
    const { user, getQLists } = this.props;

    getQLists(user._id);
  }

  render() {
    const { size, user, question, voteQuestion, qlistAddQuestion, qlists } = this.props;

    return (
      <ButtonToolbar>
        <ButtonGroup bsSize={size}>
          <Button
            bsStyle="success"
            active={question.votes.like.includes(user._id)}
            onClick={voteQuestion(question, 'like', user._id)}
          >
            <FontAwesome name="thumbs-up" /> {question.votes.like.length}
          </Button>

          <Button
            bsStyle="danger"
            active={question.votes.dislike.includes(user._id)}
            onClick={voteQuestion(question, 'dislike', user._id)}
          >
            <FontAwesome name="thumbs-down" /> {question.votes.dislike.length}
          </Button>
        </ButtonGroup>

        <ButtonGroup bsSize={size}>
          <DropdownButton
            bsSize={size}
            bsStyle="info"
            title={<FontAwesome name="star" />}
            id="qlist"
          >
            {map(qlists, (qlist, index) => (
              <MenuItem
                eventKey={index}
                key={qlist._id}
                onClick={qlistAddQuestion(qlist, question)}
              >
                {qlist.title} {qlist.questions.includes(question._id) && <FontAwesome name="check" />}
              </MenuItem>
            ))}
            <MenuItem divider />
            <LinkContainer to="/me/qlist/create">
              <MenuItem>Create new QList</MenuItem>
            </LinkContainer>
          </DropdownButton>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
}

const mapStateToProps = state => ({ qlists: state.qlists });

export default connect(mapStateToProps, { voteQuestion, qlistAddQuestion, getQLists })(Toolbar);