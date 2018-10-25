import PropTypes from 'prop-types';

import QuestionType from './QuestionType';
import UserType from './UserType';

export default PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string,
  questions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(QuestionType),
    QuestionType,
  ]).isRequired,
  author: PropTypes.oneOfType([
    PropTypes.string,
    UserType,
  ]).isRequired,
  notes: PropTypes.string,
});