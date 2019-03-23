import { shape, string, oneOfType, arrayOf } from 'prop-types';

import QuestionType, { Question } from './QuestionType';
import UserType, { User } from './UserType';

export default shape({
  _id: string.isRequired,
  title: string.isRequired,
  slug: string,
  questions: oneOfType([arrayOf(string), arrayOf(QuestionType), QuestionType])
    .isRequired,
  author: oneOfType([string, UserType]).isRequired,
  notes: string,
});

export interface QList {
  _id: string;
  title: string;
  slug: string;
  questions: Question[] | string[] | Question;
  author: string | User;
  notes: string;
}

export interface QListQuestions extends QList {
  questions: Question[];
}
