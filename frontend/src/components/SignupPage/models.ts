import { User } from '../../propTypes/UserType';

export interface SignupProps {
  signup: (user: User) => Promise<any>;
  addFlashMessage: (payload: {
    type: string;
    text: string;
  }) => { type: string; payload: { type: string; text: string } };
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
