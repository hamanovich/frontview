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
}

export interface CommentsProps {
  comments: CommentQuestion[];
  match: {
    params: {
      username: string;
    };
  } | null;
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
}
export interface CommentFormHandlersInnerProps
  extends CommentFormHandlersProps {
  reset: () => void;
}
