import { FormEvent } from 'react';
import { Auth, User, AddFlashMessageType } from '../../propTypes';

export interface AccountProps {
  user: User;
  getUser: (identifier: string) => Promise<void>;
  logout: () => void;
  removeUser: (username: string) => Promise<void>;
  addFlashMessage: AddFlashMessageType;
}

export interface AccountState {
  modal: boolean;
}

export interface AccountPageProps {
  auth: Auth;
}

export interface AccountEditProps {
  handleSubmit: (
    onSubmit: (value: any) => void,
  ) => ((event: FormEvent<HTMLFormElement>) => void) | undefined;
  onSubmit: (value: any) => void;
  isLoading: boolean;
  user: {
    username: string;
    gravatar: string;
  };
}

export interface AccountBarProps {
  auth: Auth;
  logout: () => void;
}

export interface AccountEditLifecycleProps {
  getUser: (identifier: string) => Promise<void>;
  user: User;
  initialize: any;
}

export interface AccountEditHandlersProps {
  updateUser: (user: User) => Promise<void>;
  history: {
    push: (url: string) => void;
  };
  setLoading: any;
}
