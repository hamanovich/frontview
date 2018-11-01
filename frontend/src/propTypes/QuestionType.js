import PropTypes from 'prop-types';

export default PropTypes.shape({
  _id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  skill: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  level: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  practice: PropTypes.oneOf(['practice', 'theory']).isRequired,
  answer: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  ),
  votes: PropTypes.shape({
    like: PropTypes.arrayOf(PropTypes.string),
    dislike: PropTypes.arrayOf(PropTypes.string),
  }),
  notes: PropTypes.string,
  author: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  ]).isRequired,
});
