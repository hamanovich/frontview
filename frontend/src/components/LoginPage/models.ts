import { FormEvent } from 'react';
import { Credentials } from '../../actions/auth';
import { AddFlashMessageType } from '../../propTypes';
import { InjectedFormProps } from 'redux-form';

export interface onSubmitLoginProps {
  login: (credentials: Credentials) => Promise<any>;
  history: {
    push: (url: string) => void;
  };
  getUser: (identifier: string) => void;
  setState: ({}) => void;
}

export interface LoginFormError {
  message?: string;
  response?: {
    data: {
      error: string;
    };
  };
}

export interface LoginProps {
  handleSubmit: (
    onSubmit: ({}) => void,
  ) => ((event: FormEvent<HTMLFormElement>) => void) | undefined;
  onSubmit: ({}) => void;
  state: {
    error: string;
    isLoading: boolean;
  };
}

export interface LoginPageProps {
  login: (credentials: Credentials) => void;
  forgot: (email: string) => void;
  resetToken: (
    token: string,
    passwords: { password: string; passwordConfirmation: string },
  ) => void;
  getReset: (token: string) => void;
  getUser: (identifier: string) => void;
  addFlashMessage: AddFlashMessageType;
}

export interface ResetProps extends LoginProps {}
export interface ResetFormError extends LoginFormError {}

export interface ResetHandlersProps {
  setState: ({}) => void;
  resetToken: (
    token: string,
    passwords: { password: string; passwordConfirmation: string },
  ) => Promise<any>;
  history: {
    push: (url: string) => void;
  };
  match: {
    params: {
      token: string;
    };
  };
  addFlashMessage: AddFlashMessageType;
}

export interface ResetLifecycleProps {
  getReset: (token: string) => Promise<any>;
  match: {
    params: {
      token: string;
    };
  };
  addFlashMessage: AddFlashMessageType;
}

export interface ForgotProps extends LoginProps {
  state: {
    error: string;
    isLoading: boolean;
    emailed: string;
  };
}

export interface ForgotFormError extends LoginFormError {}

export interface ForgotHandlersProps extends InjectedFormProps {
  setState: ({}) => void;
  forgot: (email: string) => Promise<any>;
}
