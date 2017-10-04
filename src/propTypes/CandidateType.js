import PropTypes from 'prop-types';

import UserType from './UserType';

export default PropTypes.shape({
  _id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  primarySkill: PropTypes.string.isRequired,
  techLevel: PropTypes.string.isRequired,
  skype: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.string),
  interviewer: PropTypes.oneOfType([
    PropTypes.string,
    UserType
  ]).isRequired,
  result: PropTypes.string,
  notes: PropTypes.string
});