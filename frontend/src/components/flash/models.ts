import { Message } from '../../propTypes/Message';

export interface FlashListProps {
  messages: Message[];
  deleteFlashMessage: (id: string | undefined) => void;
}

export interface FlashProps {
  close: () => void;
  message: Message;
}
