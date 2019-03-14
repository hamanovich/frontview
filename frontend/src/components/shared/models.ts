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
