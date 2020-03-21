import {Component, OnInit} from '@angular/core';
import {Thread} from '../../@entities/thread';
import {ChatService} from '../../services/chat/chat.service';
import {ThreadMessage} from '../../@entities/threadMessage';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class MessengerComponent implements OnInit {
  constructor(private chatService: ChatService, private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  id = '';
  avatar: string;
  firstname: string;
  lastname: string;
  existingThreadId: string;
  userThreads: Array<Thread>;
  messages: Array<ThreadMessage>;
  text = new FormGroup({
    text: new FormControl('', Validators.required)
  });

  async ngOnInit() {
    const ownerId = this.activatedRoute.snapshot.params.ownerId;
    let threadExist = false;
    await this.chatService.getAllThreads().toPromise().then(
      // @ts-ignore
      response => this.userThreads = response.data,
      () => console.log('Error fetching threads')
    );
    for (const thread of this.userThreads) {
      if (thread.receiver === ownerId || thread.sender === ownerId) {
        threadExist = true;
        this.existingThreadId = thread.id;
        break;
      }
    }
    if (ownerId) {
      if (!threadExist) {
        const newThread: Thread = {
          id: undefined,
          sender: localStorage.getItem('id'),
          receiver: ownerId,
          isArchived: false,
          subject: '',
          messages: [
            {
              id: undefined,
              text: undefined,
              creationDate: new Date(Date.now()).toISOString(),
              sender: localStorage.getItem('id'),
              isRead: false,
              photos: []
            }
          ]
        };
        await this.chatService.createNewThread(newThread).toPromise().then(
          async response => {
            // @ts-ignore
            this.id = response.data.id;
            await this.chatService.getAllThreads().toPromise().then(
              response2 => {
                // @ts-ignore
                this.userThreads = response2.data;
                this.sortThreads();
              },
              () => console.log('Error fetching threads')
            );
          },
          () => console.log('Thread creation failed'),
        );
      } else {
        this.id = this.existingThreadId;
      }
    }
    this.sortThreads();
  }

  sortThreads() {
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

  align(message: ThreadMessage) {
    if (message.sender === localStorage.getItem('id')) {
      return 'right';
    } else {
      return 'left';
    }
  }

  textBorderShape(message: ThreadMessage) {
    if (message.sender === localStorage.getItem('id')) {
      return {'border-radius': '19px 10px 19px 15px', 'background-color': '#006600', float: 'right', 'margin-right': '5px'};
    } else {
      return {'border-radius': '10px 19px 15px 19px', 'background-color': '#005739', float: 'left', 'margin-left': '5px'};
    }
  }

  async sendMessage() {
    if (this.text.valid) {
      const toSend: ThreadMessage = {
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
        () => console.log('Sending message failed')
      );
    }
  }

  getFirstMessage(messages: Array<ThreadMessage>) {
    return messages[0] ? messages[messages.length - 1].text : '';
  }

  onDeleteEvent(event) {
    this.confirmDeleteMessage(event);
  }

  confirmDeleteMessage(event) {
    this.confirmationService.confirm({
      message: 'Supprimer la discussion?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.chatService.deleteThread(event).subscribe(
          () => {
            for (const thread of this.userThreads) {
              if (thread.id === this.id) {
                this.userThreads.splice(this.userThreads.indexOf(thread), 1);
                this.messageService.add({severity: 'success', detail: 'La discussion à été supprimée!'});
              }
            }
          },
          () => this.messageService.
          add({severity: 'info', detail: 'Vous ne pouvez pas supprimer une discussion que vous n\'avez pas créée'})
        );
      },
      reject: () => {
      }
    });
  }

  parseDate(date: string) {
    const weekday = new Array(7);
    weekday[0] = 'Dimanche';
    weekday[1] = 'Lundi';
    weekday[2] = 'Mardi';
    weekday[3] = 'Mercredi';
    weekday[4] = 'Jeudi';
    weekday[5] = 'Vendredi';
    weekday[6] = 'Samedi';
    return weekday[new Date(date).getDay()] + ' ' + date.substring(5, 10) + ' ' + date.substring(12, 16);
  }
}
