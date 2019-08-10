import { FormEvent } from 'react';
import { CommentQuestion } from '../../propTypes/CommentType';
import { Auth, User } from '../../propTypes/UserType';
import { Question } from '../../propTypes/QuestionType';

export interface CommentProps {
  comment: CommentQuestion;
  match: {
    params: {
      username: string;
    };
  } | null;
  role?: string;
  approveComment: (id: string) => any;
  removeComment: (id: string) => any;
  addFlashMessage: (payload: {
    type: string;
    text: string;
  }) => { type: string; payload: { type: string; text: string } };
}

export interface CommentsProps {
  comments: CommentQuestion[];
  match: {
    params: {
      username: string;
    };
  } | null;
  role?: string;
}

export interface CommentsAuthorPageProps {
  comments: CommentQuestion[];
  match: {
    params: {
      username: string;
    };
  };
}

export interface CommentsAuthorPageState {
  comments: CommentQuestion[];
}

export interface CommentsAuthorPageLifecycleProps {
  match: {
    params: {
      username: string;
    };
  };
  addFlashMessage: (payload: {
    type: string;
    text: string;
  }) => { type: string; payload: { type: string; text: string } };
  getCommentsByAuthor: (username: string) => Promise<void>;
  history: {
    push: (url: string) => void;
  };
  auth: Auth;
}

export interface CommentsNotVerifiedPageType extends CommentsAuthorPageProps {
  getNotVerifiedComments: () => void;
  auth: Auth;
}

export interface CommentsByAuthorError {
  message?: string;
  response?: {
    data: {
      error: string;
    };
  };
}

export interface CommentFormProps {
  handleSubmit: (
    onSubmit: ({}) => void,
  ) => ((event: FormEvent<HTMLFormElement>) => void) | undefined;
  onSubmit: ({}) => void;
}

export interface CommentFormLifecycleProps {
  initialize: (username: { username: string }) => void;
  user: User;
}

export interface CommentFormHandlersProps {
  addComment: (query: any) => Promise<void>;
  user: User;
  question: Question;
  getQuestion: (slug: string) => void;
  slug: string;
  addFlashMessage: (payload: {
    type: string;
    text: string;
  }) => { type: string; payload: { type: string; text: string } };
}
export interface CommentFormHandlersInnerProps
  extends CommentFormHandlersProps {
  reset: () => void;
}
