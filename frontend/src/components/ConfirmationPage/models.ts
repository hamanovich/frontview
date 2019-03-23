export interface ConfirmationProps {
  success: boolean;
}

export interface ConfirmLifecycleProps {
  confirm: (token: string) => Promise<void>;
  getUser: (username: string) => void;
  addFlashMessage: (payload: {
    type: string;
    text: string;
  }) => { type: string; payload: { type: string; text: string } };
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
