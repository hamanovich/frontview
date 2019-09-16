import { AddFlashMessageType } from '../../propTypes';

export interface ConfirmationProps {
  success: boolean;
}

export interface ConfirmLifecycleProps {
  confirm: (token: string) => Promise<void>;
  getUser: (username: string) => void;
  addFlashMessage: AddFlashMessageType;
  match: {
    params: {
      token: string;
    };
  };
  setSuccess: (value: boolean) => void;
}

export interface ConfirmError {
  message?: string;
  response?: {
    data: {
      error: string;
    };
  };
}
