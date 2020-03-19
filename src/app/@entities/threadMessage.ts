import {Photo} from './photo';

export interface ThreadMessage {
  id: string;
  text: string;
  creationDate: string;
  isRead: boolean;
  sender: string;
  photos: Array<Photo>;
}
