import { string, arrayOf, oneOf, oneOfType, shape, bool } from 'prop-types';

export default shape({
  _id: string.isRequired,
  slug: string.isRequired,
  question: string.isRequired,
  skill: arrayOf(string.isRequired).isRequired,
  level: arrayOf(string.isRequired).isRequired,
  practice: oneOf(['practice', 'theory']).isRequired,
  answer: string.isRequired,
  answers: arrayOf(
    shape({
      text: string.isRequired,
    }).isRequired,
  ),
  isVerified: bool.isRequired,
  votes: shape({
    like: arrayOf(string),
    dislike: arrayOf(string),
  }),
  imgs: arrayOf(string),
  notes: string,
  author: oneOfType([
    string,
    shape({
      username: string.isRequired,
    }),
  ]).isRequired,
});
