import {Message} from './message';

export interface Thread {
  id: string;
  subject: string;
  isArchived: boolean;
  sender: string;
  receiver: string;
  messages: Array<Message>;
}
