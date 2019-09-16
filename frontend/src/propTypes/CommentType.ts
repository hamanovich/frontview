import { User } from './UserType';
import { Question } from './QuestionType';

export interface Comment {
  _id: string;
  author: User;
  question: Question | string;
  topic: string;
  text: string;
  created: string;
  isVerified: boolean;
}

export interface CommentQuestion extends Comment {
  question: Question;
}
