import { FormEvent } from 'react';
import { InjectedFormProps } from 'redux-form';
import { Credentials } from '../../actions/auth';
import { AddFlashMessageType } from '../../propTypes';

export interface OnSubmitLoginProps {
  login: (credentials: Credentials) => Promise<any>;
  history: {
    push: (url: string) => void;
  };
  getUser: (identifier: string) => void;
  setState: (value: any) => void;
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
    onSubmit: (value: any) => void,
  ) => ((event: FormEvent<HTMLFormElement>) => void) | undefined;
  onSubmit: (value: any) => void;
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

export interface ResetHandlersProps {
  setState: (value: any) => void;
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

export interface ForgotHandlersProps extends InjectedFormProps {
  setState: (value: any) => void;
  forgot: (email: string) => Promise<any>;
}
