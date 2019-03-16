import { User } from '../../propTypes/UserType';
import { Question } from '../../propTypes/QuestionType';
import { QList } from '../../propTypes/QListType';

export interface ToolbarProps {
  user: User;
  question: Question;
  voteQuestion: (question: any, action: any, userId: string) => any;
  qlistAddQuestion: (qlist: any, question: any) => any;
  qlists: Array<QList>;
}

export interface PaginationBarProps {
  activePage: number;
  pages: number;
  onSelect: (page: number) => void;
}

export interface ZoomImageProps {
  zoom: {
    clone: (background: any) => any;
  };
  background: string;
  src: string;
  alt: string;
}
