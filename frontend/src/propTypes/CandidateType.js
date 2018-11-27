import { shape, string, arrayOf, oneOfType } from 'prop-types';

import UserType from './UserType';

export default shape({
  _id: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  email: string.isRequired,
  primarySkill: string.isRequired,
  techLevel: string.isRequired,
  skype: string,
  questions: arrayOf(string),
  interviewer: oneOfType([string, UserType]).isRequired,
  result: string,
  notes: string,
});
