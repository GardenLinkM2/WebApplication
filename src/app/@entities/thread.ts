import {ThreadMessage} from './threadMessage';

export interface Thread {
  id: string;
  subject: string;
  isArchived: boolean;
  sender: string;
  receiver: string;
  messages: Array<ThreadMessage>;
}
