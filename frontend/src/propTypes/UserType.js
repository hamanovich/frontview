import { shape, string, arrayOf, oneOf } from 'prop-types';

export default shape({
  _id: string,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  primarySkill: string,
  jobFunction: string,
  skype: string,
  questions: arrayOf(string),
  votes: shape({
    like: arrayOf(string),
    dislike: arrayOf(string),
  }),
  phone: string,
  notes: string,
  gravatar: string,
  role: oneOf(['user', 'owner', 'admin']),
});
