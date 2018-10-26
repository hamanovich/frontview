import PropTypes from 'prop-types';

import UserType from './UserType';
import QuestionType from './QuestionType';

export default PropTypes.shape({
  _id: PropTypes.string.isRequired,
  author: UserType,
  question: PropTypes.oneOfType([QuestionType, PropTypes.string]),
  topic: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
});
