import { FormEvent } from 'react';
import { Question, Auth, AddFlashMessageType } from '../../../propTypes';

export interface AnswerFieldsProps {
  fields: {
    map: any;
    push: (answer?: any) => void;
    remove: any;
  };
  meta: {
    touched: boolean;
    error: string;
    submitFailed: boolean;
  };
}

export interface AddQuestionProps {
  handleSubmit: (
    onSubmit: ({}) => void,
  ) => ((event: FormEvent<HTMLFormElement>) => void) | undefined;
  addQuestion: any;
  addQuestionsFromFile: (query: any) => any;
  editQuestion: (data: any) => Promise<void>;
  getQuestionInterface: () => Promise<{
    skill: string[];
    level: string[];
    practice: string[];
  }>;
  addFlashMessage: AddFlashMessageType;
  removeQuestion: (id: string) => Promise<void>;
  getQuestionById: (_id: string) => Promise<any>;
  logout: any;
  match: {
    params: {
      _id: string;
    };
  };
  userId: string;
  history: {
    push: (url: string) => void;
  };
  initialValues: any;
}

export interface AddQuestionState {
  isLoading: boolean;
  showRemoveModal: boolean;
  level: string[];
  practice: string[];
  skill: string[];
  dropzone: boolean;
  fileName: string;
  imgs: any[];
}

export interface AddQuestionMapState {
  questions: Question[];
  auth: Auth;
}

export interface AddQuestionMapProps {
  match: {
    params: {
      _id: string;
    };
  };
}
