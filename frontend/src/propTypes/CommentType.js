import { shape, string, oneOfType } from 'prop-types';

import UserType from './UserType';
import QuestionType from './QuestionType';

export default shape({
  _id: string.isRequired,
  author: UserType,
  question: oneOfType([QuestionType, string]),
  topic: string.isRequired,
  text: string.isRequired,
  created: string.isRequired,
});
