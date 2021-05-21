import User from './User';

export default interface Message {
  message: string;
  user: User;
  timecreated: number;
  sectionId: number;
}
