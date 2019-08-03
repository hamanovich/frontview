import { Auth } from '../propTypes/UserType';

export interface ScrollToTopRouteProps {
  history: {
    listen: (clbk: () => void) => () => void;
  };
}

export interface LoaderState {
  isEmpty: boolean;
  timeout: number;
}

export interface AuthorizationProps {
  auth: Auth;
  addFlashMessage: (payload: {
    type: string;
    text: string;
  }) => { type: string; payload: { type: string; text: string } };
  history: {
    push: (url: string) => void;
  };
}
