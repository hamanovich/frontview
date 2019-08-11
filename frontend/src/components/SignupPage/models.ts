import { AddFlashMessageType, User } from './../../propTypes';

export interface SignupProps {
  signup: (user: User) => Promise<any>;
  addFlashMessage: AddFlashMessageType;
  isUserExists: (identifier: string) => Promise<any>;
}

export interface SignupFormState {
  errors: {
    username?: string;
    email?: string;
    errorMsg?: string;
    [key: string]: string | undefined;
  };
  isLoading: boolean;
  invalid: boolean;
}

export interface SignupFormError {
  message?: string;
  response?: {
    data: {
      error: string;
    };
  };
}
