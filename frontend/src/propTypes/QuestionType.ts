import { string, arrayOf, oneOf, oneOfType, shape, bool } from 'prop-types';

import { Comment } from './CommentType';

export default shape({
  _id: string.isRequired,
  slug: string.isRequired,
  question: string.isRequired,
  skill: arrayOf(string.isRequired).isRequired,
  level: arrayOf(string.isRequired).isRequired,
  practice: oneOf(['practice', 'theory']).isRequired,
  answer: string.isRequired,
  answers: arrayOf(
    shape({
      text: string.isRequired,
    }).isRequired,
  ),
  isVerified: bool.isRequired,
  votes: shape({
    like: arrayOf(string),
    dislike: arrayOf(string),
  }),
  imgs: arrayOf(string),
  notes: string,
  author: oneOfType([
    string,
    shape({
      username: string.isRequired,
    }),
  ]),
});

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
