export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  primarySkill: string;
  jobFunction: string;
  skype: string;
  questions: string[];
  votes: {
    like: string[];
    dislike: string[];
  };
  phone: string;
  notes: string;
  gravatar: string;
  role: 'user' | 'owner' | 'admin';
}

export interface Auth {
  isAuthenticated: boolean;
  user: User;
}
