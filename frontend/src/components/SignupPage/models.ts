import { User } from '../../propTypes/UserType';

export interface SignupProps {
  signup: (user: User) => Promise<any>;
  addFlashMessage: (payload: {
    type: string;
    text: string;
  }) => { type: string; payload: { type: string; text: string } };
  isUserExists: (identifier: string) => Promise<any>;
}
