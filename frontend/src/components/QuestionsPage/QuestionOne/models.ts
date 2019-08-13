import {
  AddFlashMessageType,
  Question,
  User,
  QList,
} from './../../../propTypes';

export interface QuestionOneProps {
  addFlashMessage: AddFlashMessageType;
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
