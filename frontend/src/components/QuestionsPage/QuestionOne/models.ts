import { Question } from '../../../propTypes/QuestionType';
import { User } from '../../../propTypes/UserType';
import { QList } from '../../../propTypes/QListType';

export interface QuestionOneProps {
  addFlashMessage: (payload: {
    type: string;
    text: string;
  }) => { type: string; payload: { type: string; text: string } };
  getQuestionBySlug: (slug: string) => any;
  getUser: (identifier: string) => void;
  getQLists: (username: string) => void;
  addComment: (comment: any) => any;
  match: {
    params: {
      slug: string;
    };
  };
  question: Question | undefined;
  user: User;
  qlists: QList[];
  approveQuestion: (id: string) => void;
  editQuestionField: (id: string, field: string, value: string) => void;
  history: {
    push: (url: string) => void;
  };
}
