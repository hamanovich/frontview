import { User } from './UserType';
import { Question } from './QuestionType';

export interface Comment {
  _id: string;
  author: User;
  question: Question | string;
  topic: string;
  text: string;
  created: string;
}

export interface CommentQuestion extends Comment {
  question: Question;
}
