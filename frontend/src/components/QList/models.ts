import { FormEvent } from 'react';
import { QListQuestions, QList, AddFlashMessageType } from '../../propTypes';

export interface QListPageProps {
  userId: string;
}

export interface QListsProps {
  getQLists: (username: string) => void;
  removeQList: (_id: string) => void;
  qlists: QListQuestions[];
  username: string;
}

export interface QListsState {
  showModal: boolean;
  id: string;
}

export interface QListFormProps {
  isLoading: boolean;
  userId: string;
  handleSubmit: (
    onSubmit: ({}) => void,
  ) => ((event: FormEvent<HTMLFormElement>) => void) | undefined;
  onSubmit: ({}) => void;
}

export interface QListFormHandlersProps {
  qlistAdd: (qlist: QList) => Promise<void>;
  userId: string;
  reset: () => void;
  addFlashMessage: AddFlashMessageType;
  setLoading: (value: boolean) => void;
}
