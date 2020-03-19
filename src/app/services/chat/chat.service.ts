import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Thread} from '../../@entities/thread';
import {ThreadMessage} from '../../@entities/threadMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatUrl = `${environment.url}api/Talks`;
  constructor(private client: HttpClient) { }

  getAllThreads() {
   return  this.client.get(this.chatUrl);
  }
  getThread(id: string) {
    return this.client.get(`${this.chatUrl}/${id}`);
  }
  createNewThread(newThread: Thread) {
    return this.client.post(this.chatUrl, newThread);
  }
  sendMessage(newMessage: ThreadMessage, threadId: string) {
    return this.client.post(`${this.chatUrl}/${threadId}`, newMessage);
  }
  deleteThread(threadId: string) {
    return this.client.delete(`${this.chatUrl}/${threadId}`);
  }
}
