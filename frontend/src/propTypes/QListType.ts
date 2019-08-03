import { Question } from './QuestionType';
import { User } from './UserType';

export interface QList {
  _id: string;
  title: string;
  slug: string;
  questions: Question[];
  author: string | User;
  notes: string;
}

export interface QListQuestions extends QList {
  questions: Question[];
}
