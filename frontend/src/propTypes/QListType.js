import { shape, string, oneOfType, arrayOf } from 'prop-types';

import QuestionType from './QuestionType';
import UserType from './UserType';

export default shape({
  _id: string.isRequired,
  title: string.isRequired,
  slug: string,
  questions: oneOfType([arrayOf(string), arrayOf(QuestionType), QuestionType]).isRequired,
  author: oneOfType([string, UserType]).isRequired,
  notes: string,
});
