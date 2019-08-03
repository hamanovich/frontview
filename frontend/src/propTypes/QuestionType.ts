import { Comment } from './CommentType';

export interface Question {
  _id: string;
  slug: string;
  question: string;
  skill: string[];
  level: string[];
  practice: 'practice' | 'theory';
  answer: string;
  answers: Array<{ text: string }>;
  isVerified: boolean;
  votes: {
    like: string[];
    dislike: string[];
  };
  imgs: string[];
  notes: string;
  author: string | { username: string };
  comments: string[] | Comment[] | undefined;
  lastModified: string;
}
