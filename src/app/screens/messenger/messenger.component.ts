import {Component, OnInit} from '@angular/core';
import {Thread} from '../../@entities/thread';
import {ChatService} from '../../services/chat/chat.service';
import {ThreadMessage} from '../../@entities/threadMessage';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {Photo} from '../../@entities/photo';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class MessengerComponent implements OnInit {
  constructor(private chatService: ChatService, private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService, private messageService: MessageService,
              private client: HttpClient,
              private router: Router) {
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
  uploadedFiles: any[] = [];
  uploadFile: FormGroup;
  previewUrls = [];
  showImage: string ;
  show: boolean;
  showSpinner: boolean;


  async ngOnInit() {
    this.showSpinner = true;

    const ownerId = this.activatedRoute.snapshot.params.ownerId;
    let threadExist = false;
    this.uploadFile = new FormGroup({
      profile: new FormControl('')
    });
    await this.chatService.getAllThreads().toPromise().then(
      // @ts-ignore
      response => {
        // @ts-ignore
        this.userThreads = response.data;
        this.showSpinner = false;
      },
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
      this.showSpinner = true;
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
            creationDate: Math.floor(Date.now() / 1000),
            isRead: false,
            sender: localStorage.getItem('id'),
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
                this.showSpinner = false;
              },
              () => console.log('Error fetching threads')
            );

          },
          () => console.log('Thread creation failed'),
        );
      } else {
        this.id = this.existingThreadId;
        this.showSpinner = false;
      }
    }
    this.sortThreads();

  }

  sortThreads() {
    this.userThreads.sort((a, b) => {
      if ((a.messages !== undefined && b.messages !== undefined) &&
        (a.messages[a.messages.length - 1].creationDate < b.messages[b.messages.length - 1].creationDate)) {
        return 1;
      } else if ((a.messages !== undefined && b.messages !== undefined) &&
        (a.messages[a.messages.length - 1].creationDate > b.messages[b.messages.length - 1].creationDate)) {
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
      if (this.router.url.includes('messages')) {
        this.refreshMessages();
      }

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
    if (this.text.valid || this.uploadedFiles.length > 0) {
      const toSend: ThreadMessage = {
        id: undefined,
        text: this.text.get('text').value,
        creationDate: Math.floor(Date.now() / 1000),
        isRead: false,
        sender: localStorage.getItem('id'),
        photos: []
      };
      if (this.uploadedFiles.length > 0) {
        for (const file of this.uploadedFiles) {
          const formData = new FormData();
          formData.append('file', file);
          await this.client.post<any>('https://uploadm2.artheriom.fr/upload.php', formData).toPromise().then(
            (response) => toSend.photos.push(
              {
                id: undefined,
                fileName: response[0],
                path: response[0]
              }),
            (err) => console.log(err)
          );
        }
      }
      await this.chatService.sendMessage(toSend, this.id).subscribe(
        // @ts-ignore
        response => {
          // @ts-ignore
          this.messages.push(response.data);
          this.scroll();
          this.chatService.getAllThreads().toPromise().then(
            response2 => {
              // @ts-ignore
              this.userThreads = response2.data;
              this.sortThreads();
              if (this.uploadedFiles.length > 0) {
                this.removeImage();
              }
            },
            () => console.log('Error fetching threads')
          );
          this.text.get('text').setValue('');
        },
        () => console.log('Sending message failed')
      );
    }
  }

  getFirstMessage(messages: Array<ThreadMessage>) {
    return messages[0] ? messages[messages.length - 1] : null;
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
          () => this.messageService.add({
            severity: 'info',
            detail: 'Vous ne pouvez pas supprimer une discussion que vous n\'avez pas créée'
          })
        );
      },
      reject: () => {
      }
    });
  }

  parseDate(date: number) {
    const weekday = new Array(7);
    const dateToString = new Date(Math.floor(date * 1000)).toISOString();
    weekday[0] = 'Dimanche';
    weekday[1] = 'Lundi';
    weekday[2] = 'Mardi';
    weekday[3] = 'Mercredi';
    weekday[4] = 'Jeudi';
    weekday[5] = 'Vendredi';
    weekday[6] = 'Samedi';
    return weekday[new Date(dateToString).getDay()] + ' ' + dateToString.substring(5, 10) + ' ' + dateToString.substring(11, 16);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.uploadedFiles.push(file);
        this.uploadFile.get('profile').setValue(file);
        const reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        reader.onload = (pevent) => { // called once readAsDataURL is completed
          // @ts-ignore
          this.previewUrls.push(pevent.target.result);
        };
      }
    }
  }

  removeImage() {
    this.uploadedFiles.splice(0, 1);
    this.previewUrls.splice(0, 1);
  }

  getPhoto(photos: Array<Photo>) {
    return {
      'background-image': 'url(' + photos[0].path + ')',
      width: '50px',
      height: '50px',
      'background-position': '50% 50%',
      'font-size': 0,
      'background-size': '50px 50px',
      'border-radius': '10px'
    };
  }

  throwInformation() {
    if (this.uploadedFiles.length > 0) {
      this.messageService.add({severity: 'info', detail: 'Vous ne pouvez ajouter qu\'une seule image'});
    }
  }
}
