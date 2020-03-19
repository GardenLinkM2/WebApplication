import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../@entities/user';
import {UserService} from '../../services/user-info/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @Input() fisrtMessage: string;
  @Input() userId: string;
  @Input() threadId: string;
  @Output() sendId = new EventEmitter();
  @Output() sendContactbanner =  new EventEmitter();
  @Output() sendDeleteEvent =  new EventEmitter();
  firstName = '';
  lastName = '';
  avatar = '';
  constructor(private userService: UserService) { }

  async ngOnInit() {
    await this.userService.getUserById(this.userId).subscribe(
      (response: User) => {
        if (response.avatar !== '') {
          this.avatar = response.avatar;
        } else {
          this.avatar = 'assets/img/defaultavatar.png';
        }
        this.firstName = response.firstName;
        this.lastName =  response.lastName;
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
}
