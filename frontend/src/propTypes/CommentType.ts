import { shape, string, oneOfType } from 'prop-types';

import UserType, { User } from './UserType';
import QuestionType, { Question } from './QuestionType';

export default shape({
  _id: string.isRequired,
  author: UserType,
  question: oneOfType([QuestionType, string]),
  topic: string.isRequired,
  text: string.isRequired,
  created: string.isRequired,
});

export interface Comment {
  _id: string;
  author: User;
  question: Question | string;
  topic: string;
  text: string;
  created: string;
}
