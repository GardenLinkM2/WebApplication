import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from '../../@entities/user';
import {UserService} from '../../services/user-info/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnChanges {

  @Input() fisrtMessage: string;
  @Input() userId: string;
  @Input() threadId: string;
  @Input() selectedThreadId: string;
  @Output() sendId = new EventEmitter();
  @Output() sendContactbanner = new EventEmitter();
  @Output() sendDeleteEvent = new EventEmitter();
  firstName = '';
  lastName = '';
  avatar = '';

  constructor(private userService: UserService) {
  }

  async ngOnInit() {
    console.log(this.threadId, this.selectedThreadId);
    await this.userService.getUserById(this.userId).subscribe(
      (response: User) => {
        if (response.avatar !== '') {
          this.avatar = response.avatar;
        } else {
          this.avatar = 'assets/img/defaultavatar.png';
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
}
