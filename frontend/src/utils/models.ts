import { Auth, AddFlashMessageType } from '../propTypes';

export interface ScrollToTopRouteProps {
  history: {
    listen: (clbk: () => void) => () => void;
  };
}

export interface LoaderState {
  isEmpty: boolean;
  nothingFound: boolean;
  timeout: number;
}

export interface AuthorizationProps {
  auth: Auth;
  addFlashMessage: AddFlashMessageType;
  history: {
    push: (url: string) => void;
  };
}
