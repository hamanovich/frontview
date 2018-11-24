import React from 'react';
import { shape, string, arrayOf, number } from 'prop-types';
import map from 'lodash/map';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';

import styled from 'styled-components';

import Badge from 'react-bootstrap/lib/Badge';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

import { addFlashMessage } from '../../actions/flash';
import { getQuestionsByFilter } from '../../actions/questions';
import { getQLists } from '../../actions/qlists';

const Buttons = styled(ButtonToolbar)`
  min-height: 45px;
`;

const enhance = compose(
  connect(
    state => ({
      user: state.auth.user,
    }),
    {
      getQuestionsByFilter,
      getQLists,
      addFlashMessage,
    },
  ),

  withState('tags', 'setTags', []),

  lifecycle({
    componentDidMount() {
      const {
        getQuestionsByFilter,
        getQLists,
        addFlashMessage,
        history,
        user,
        active,
        filter,
        setTags,
      } = this.props;

      getQuestionsByFilter(filter, active).then(({ tags, questions }) => {
        if (!tags.length) {
          addFlashMessage({
            type: 'warn',
            text: `There is no filter - ${active}`,
          });

          history.push('/questions');

          return;
        }

        if (!questions.length) {
          addFlashMessage({
            type: 'warn',
            text: 'No questions found',
          });
        }

        setTags(tags);

        getQLists(user._id);
      });
    },
  }),
);

const QuestionsBar = ({ active, filter, tags, style }) => (
  <Buttons>
    {map(tags, tag => (
      <Link
        className={classNames('btn', `btn-${style}`, { active: active === tag._id })}
        key={tag._id}
        to={{ pathname: `/questions/${filter}/${tag._id}` }}>
        {tag._id} <Badge>{tag.count}</Badge>
      </Link>
    ))}
  </Buttons>
);

QuestionsBar.propTypes = {
  style: string,
  active: string,
  filter: string.isRequired,
  tags: arrayOf(
    shape({
      _id: string.isRequired,
      count: number.isRequired,
    }),
  ).isRequired,
};

QuestionsBar.defaultProps = {
  active: '',
  style: 'primary',
};

export default enhance(QuestionsBar);
