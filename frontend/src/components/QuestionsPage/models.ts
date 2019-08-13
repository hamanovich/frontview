import {
  Question,
  QList,
  QListQuestions,
  User,
  Auth,
  AddFlashMessageType,
} from '../../propTypes';

export interface Tag {
  _id: string;
  count: number;
}

export interface QuestionsTopProps {
  questions: Question[];
}

export interface QuestionsTagsProps {
  history: { push: (url: string) => void };
  match: {
    params: {
      filter: string;
      tag: string;
    };
  };
}

export interface QuestionsSearchProps {
  location: {
    search: string;
  };
}

export interface QuestionsQListProps {
  match: {
    params: {
      slug: string;
    };
  };
  qlists: QList[];
}

export interface QuestionsAuthorProps {
  match: {
    params: {
      username: string;
    };
  };
}

export interface QuestionsAllProps {
  state: {
    pagination: {
      activePage: number;
      pages: number;
      count: number;
    };
    tags: Tag[];
  };
  history: {
    push: (url: string) => void;
  };
}

export interface QuestionsFromInternetProps {
  match: {
    params: {
      source: string;
    };
  };
  history: {
    push: (url: string) => void;
  };
}

export interface QuestionsFromInternetState {
  prefixHistory: string;
  routes: string[];
  source: string;
}

export interface QuestionsProps {
  user: User;
  qlists: QListQuestions[];
  questions: Question[];
  approveQuestion: (_id: string) => void;
  editQuestionField: (
    _id: string,
    field: string,
    value: string,
  ) => Promise<Question>;
}

export interface QuestionsState {
  auth: Auth;
  questions: Question[];
  qlists: QListQuestions[];
}

export interface QuestionsBarProps {
  style: string;
  active: string;
  filter: string;
  tags: Tag[];
}

export interface QuestionsBarsRouteProps {
  history: {
    push: (url: string) => void;
  };
  active: string;
  filter: string;
}

export interface QuestionsBarState {
  auth: Auth;
}

export interface QuestionsBarLifecycleProps {
  getQuestionsByFilter: (
    filter: string,
    active: string,
  ) => Promise<{ tags: Tag[]; questions: Question[] }>;
  getQLists: (username: string) => void;
  addFlashMessage: AddFlashMessageType;
  history: {
    push: (url: string) => void;
  };
  user: User;
  active: string;
  filter: string;
  setTags: (tags: Tag[]) => void;
}

export interface QuestionProps {
  question: Question;
  user: User;
  qlists: QListQuestions[];
  approveQuestion: (_id: string) => void;
  editQuestionField: (
    _id: string,
    field: string,
    value: string,
  ) => Promise<Question>;
  history: {
    push: (url: string) => void;
  };
  match?: {
    params: {
      slug: string;
    };
  };
}

export interface QuestionState {
  showModal: boolean;
  textField: string;
  answerField: { text: string } | string;
}

export interface QuestionsWrapperProps {
  questions: Question[];
  getQuestions: any;
  getQLists: any;
  getTopQuestions: any;
  getQuestionsByAuthor: (author: string) => Promise<void>;
  getSearchedQuestions: any;
  getQListQuestions: any;
  addFlashMessage: any;
  user: {
    username: string;
    _id: string;
  };
  match: {
    params: {
      filter: string;
      tag: string;
      page: string;
      username: string;
      slug: string;
    };
    path: string;
  };
  location: {
    search: string;
  };
  history: {
    push: (url: string) => void;
  };
}

export interface QuestionsWrapperState {
  pagination: {
    activePage: number;
    pages: number;
    count: number;
  };
}

export interface GetQuestionsError {
  message?: string;
  response?: {
    data: {
      error: string;
    };
  };
}

export interface QuestionsWrapperStateProps {
  auth: Auth;
  questions: Question[];
  qlists: QList[];
}
