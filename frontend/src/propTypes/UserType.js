import PropTypes from 'prop-types';

export default PropTypes.shape({
  _id: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  primarySkill: PropTypes.string,
  jobFunction: PropTypes.string,
  skype: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.string),
  votes: PropTypes.shape({
    like: PropTypes.arrayOf(PropTypes.string),
    dislike: PropTypes.arrayOf(PropTypes.string),
  }),
  phone: PropTypes.string,
  notes: PropTypes.string,
  gravatar: PropTypes.string,
  role: PropTypes.oneOf(['user', 'owner', 'admin']),
});