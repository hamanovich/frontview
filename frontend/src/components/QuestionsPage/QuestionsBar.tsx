import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';

import Badge from 'react-bootstrap/Badge';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import { addFlashMessage } from '../../actions/flash';
import { getQuestionsByFilter } from '../../actions/questions';
import { getQLists } from '../../actions/qlists';
import {
  QuestionsBarProps,
  QuestionsBarState,
  QuestionsBarLifecycleProps,
  QuestionsBarsRouteProps,
  Tag,
} from './models';

const enhance = compose<QuestionsBarProps, QuestionsBarsRouteProps>(
  connect(
    (state: QuestionsBarState) => ({
      user: state.auth.user,
    }),
    {
      getQuestionsByFilter,
      getQLists,
      addFlashMessage,
    },
  ),

  withState('tags', 'setTags', []),

  lifecycle<QuestionsBarLifecycleProps, {}>({
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

      getQuestionsByFilter(filter, active)
        .then(({ tags, questions }) => {
          if (!tags.length) {
            addFlashMessage({
              type: 'warn',
              text: `There is no filter - ${active}`,
            });

            history.push('/questions/page/1');

            return;
          }

          if (!questions.length) {
            addFlashMessage({
              type: 'warn',
              text: 'No questions found',
            });
          }

          setTags(tags);

          if (user.username) {
            getQLists(user.username);
          }
        })
        .catch(() => {
          addFlashMessage({
            type: 'warn',
            text: 'It looks you typed wrong url. Check it',
          });

          history.push('/questions/page/1');
        });
    },
  }),
);

const QuestionsBar: FunctionComponent<QuestionsBarProps> = ({
  active,
  filter,
  tags,
  style,
}) => (
  <ButtonToolbar style={{ minHeight: 38 }}>
    {tags.map((tag: Tag) => (
      <Link
        className={classNames('btn', `btn-${style}`, {
          active: active === tag._id,
        })}
        key={tag._id}
        to={{ pathname: `/questions/${filter}/${tag._id}` }}>
        {tag._id} <Badge variant="warning">{tag.count}</Badge>
      </Link>
    ))}
  </ButtonToolbar>
);

QuestionsBar.defaultProps = {
  active: '',
  style: 'primary',
};

export default enhance(QuestionsBar);
