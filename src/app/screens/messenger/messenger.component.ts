import {Component, OnInit} from '@angular/core';
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

  constructor(private chatService: ChatService) {
  }

  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
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
    console.log(this.userThreads);
    this.userThreads.sort((a, b) => {
      if ((a.messages !== undefined && b.messages !== undefined) &&
        (Date.parse(a.messages[a.messages.length - 1].creationDate) < Date.parse(b.messages[b.messages.length - 1].creationDate))) {
        return 1;
      } else if ((a.messages !== undefined && b.messages !== undefined) &&
        (Date.parse(a.messages[a.messages.length - 1].creationDate) > Date.parse(b.messages[b.messages.length - 1].creationDate))) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  getReceiver(receiverId: string, senderId: string) {
    if (localStorage.getItem('id') !== receiverId) {
      return receiverId;
    } else {
      return senderId;
    }
  }

  async onThreadIdChange(event) {
    this.id = event;
    await this.chatService.getThread(this.id).toPromise().then(
      response => {
        // @ts-ignore
        this.messages = response.data.messages;
        this.scroll();
      },
      () => console.log('fecthing messages failed')
    );
    await this.refreshMessages();
  }

  refreshMessages() {
    setTimeout(async () => {
      await this.chatService.getAllThreads().toPromise().then(
        // @ts-ignore
        response => {
          // @ts-ignore
          const curThread = response.data.find(thread => !thread.id.localeCompare(this.id));
          if (this.messages.length !== curThread.messages.length) {
            // @ts-ignore
            this.messages = curThread.messages;
            this.scroll();
            console.log('ICICICIC');
          }
          let aschanged = false;
          // @ts-ignore
          if (response.data.length !== this.userThreads.length) {
            // @ts-ignore
            this.userThreads = response.data;
            this.sortThreads();
          } else {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.userThreads.length; i++) {
              if (this.userThreads[i].messages.length !==
                // @ts-ignore
                response.data.find(thread => !this.userThreads[i].id.localeCompare(thread.id)).messages.length) {
                aschanged = true;
              }
            }
            if (aschanged) {
              // @ts-ignore
              this.userThreads = response.data;
              this.sortThreads();
            }
          }
        },
        () => console.log('fecthing messages failed')
      );
      this.refreshMessages();
    }, 3000);
  }

  scroll() {
    console.log(document.getElementById('showMessages').scrollHeight);
    setTimeout(() => {
        document.getElementById('showMessages').scrollTop = document.getElementById('showMessages').scrollHeight;
      },
      20);
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
      creationDate: new Date(Date.now()).toISOString(),
      isRead: false,
      sender: localStorage.getItem('id'),
      photos: []
    };
    await this.chatService.sendMessage(toSend, this.id).subscribe(
      // @ts-ignore
      response => {
        // @ts-ignore
        this.messages.push(response.data);
        this.scroll();
        this.sortThreads();
        this.chatService.getAllThreads().toPromise().then(
          // @ts-ignore
          response2 => this.userThreads = response2.data,
          () => console.log('Error fetching threads')
        );
        this.text.get('text').setValue('');
      },
      failure => console.log('Sending message failed')
    );
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
