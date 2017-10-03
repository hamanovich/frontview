import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Badge from 'react-bootstrap/lib/Badge';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

const QuestionsBar = ({ active, filter, tags, style }) => (
  <ButtonToolbar>
    {map(tags, tag => (
      <Link
        className={classNames('btn', `btn-${style}`, { active: active === tag._id })}
        key={tag._id}
        to={`/questions/${filter}/${tag._id}`}
      >
        {tag._id} <Badge>{tag.count}</Badge>
      </Link>
    ))}
  </ButtonToolbar>
);

QuestionsBar.propTypes = {
  style: PropTypes.string,
  active: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired
};

QuestionsBar.defaultProps = {
  style: 'primary'
};

export default QuestionsBar;