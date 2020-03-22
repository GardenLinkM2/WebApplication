import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from '../../@entities/user';
import {UserService} from '../../services/user-info/user.service';
import {ThreadMessage} from '../../@entities/threadMessage';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnChanges {

  @Input() firstMessage: ThreadMessage;
  @Input() userId: string;
  @Input() threadId: string;
  @Input() selectedThreadId: string;
  @Output() sendId = new EventEmitter();
  @Output() sendContactbanner = new EventEmitter();
  @Output() sendDeleteEvent = new EventEmitter();
  firstName = '';
  lastName = '';
  avatar = 'assets/img/defaultavatar.png';

  constructor(private userService: UserService) {
  }

  async ngOnInit() {
    await this.userService.getUserById(this.userId).subscribe(
      (response: User) => {
        if (response.avatar.includes('/uploadm2.artheriom.fr')) {
          this.avatar = response.avatar;
        }
        this.firstName = response.firstName;
        this.lastName = response.lastName;
        if (!this.selectedThreadId.localeCompare(this.threadId)) {
          this.sendContactBannerToMessage();
          this.sendIdToMessage();
        }
      },
      () => console.log('Error Fetching contact')
    );
  }

  sendIdToMessage() {
    this.sendId.emit(this.threadId);
  }

  sendContactBannerToMessage() {
    this.sendContactbanner.emit({
      avatar: this.avatar,
      firstname: this.firstName,
      lastname: this.lastName
    });
  }

  sendDeleteEventToMessage() {
    this.sendDeleteEvent.emit(this.threadId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  setFirstMessage() {

    if (this.firstMessage && this.firstMessage.text) {
      return this.firstMessage.sender === this.userId ? this.firstName + ' : ' + this.firstMessage.text : 'vous : ' +
        this.firstMessage.text;
    } else {
      return '';
    }
  }
}
