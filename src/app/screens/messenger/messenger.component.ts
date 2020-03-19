import { Component, OnInit } from '@angular/core';
import {Thread} from '../../@entities/thread';
import {ChatService} from '../../services/chat/chat.service';
import {Message} from '../../@entities/message';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  constructor(private chatService: ChatService) { }
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  firstMessage =  'the red brown fox jumps over the lazy dog the red brown fox jumps over the lazy dog';
  userThreads: Array<Thread>;
  messages: Array<Message>;
  text = new FormGroup({
    text: new FormControl('')
  });
  async ngOnInit() {
    await this.chatService.getAllThreads().toPromise().then(
      // @ts-ignore
      response => this.userThreads = response.data,
      () => console.log('Error fetching threads')
    );
    this.sortThreads();
  }
  sortThreads() {
    this.userThreads.sort((a, b) => {
      if ((a.messages !== undefined && b.messages !== undefined) &&
        (Date.parse(a.messages[a.messages.length - 1].creationDate) < Date.parse(b.messages[b.messages.length - 1].creationDate))) {
      return 1;
    } else if ((a.messages !== undefined && b.messages !== undefined) &&
        (Date.parse(a.messages[a.messages.length - 1].creationDate) > Date.parse(b.messages[b.messages.length - 1].creationDate)))  {
      return -1;
    } else {
      return 0;
    }});
  }
  getReceiver(receiverId: string, senderId: string) {
    if (localStorage.getItem('id') !== receiverId) {
      return receiverId;
    } else {
      return  senderId;
    }
  }
  async onThreadIdChange(event) {
    this.id = event;
    await this.chatService.getThread(this.id).toPromise().then(
      // @ts-ignore
      response => this.messages = response.data.messages,
      () => console.log('fecthing messages failed')
    );
  }
  onReiceveContactBanner(event) {
    this.avatar = event.avatar;
    this.firstname = event.firstname;
    this.lastname = event.lastname;
  }
  align(message: Message) {
    if (message.sender === localStorage.getItem('id')) {
      return 'right';
    } else {
      return 'left';
    }
  }
  textBordeShape(message: Message) {
    if (message.sender === localStorage.getItem('id')) {
      return {'border-radius': '19px 10px 19px 15px', 'background-color': '#006600'};
    } else {
      return {'border-radius': '10px 19px 15px 19px', 'background-color': '#005739'};
    }
  }
  async sendMessage() {
    const toSend: Message = {
      id: undefined,
      text: this.text.get('text').value,
      creationDate: '2020-03-18T18:50:13.061Z',
      isRead: false,
      sender: localStorage.getItem('id'),
      photos: []
    };
    this.chatService.sendMessage(toSend, this.id).subscribe(
      // @ts-ignore
      response => this.messages.push(response.data),
      failure => console.log('Sending message failed')
    );
    await this.chatService.getAllThreads().toPromise().then(
      // @ts-ignore
      response => this.userThreads = response.data,
      () => console.log('Error fetching threads')
    );
    this.sortThreads();
  }
  getFirstMessage(messages: Array<Message>) {
    return messages[0] ? messages[messages.length - 1].text : '';
  }
  onDeleteEvent(event) {
    this.chatService.deleteThread(event).subscribe(
      () => {
        for (const thread of this.userThreads) {
          if (thread.id === this.id) {
            this.userThreads.splice(this.userThreads.indexOf(thread), 1);
          }
        }
      },
    failure => console.log('Thread deletion has failed')
    );
  }
}
