import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/connexion/authentication.service';
import { ModalService } from './../../services/modal-service/modal.service';
import {AfterViewInit, Component, OnInit, Input} from '@angular/core';
import {BackgroundService} from '../../services/backgroud-service/background.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isUserNotConnected = true;
  isBackgroundEnabled = false;
  displayModal: boolean;
  items: MenuItem[];

  constructor(private backgroundService: BackgroundService,
              private modal: ModalService,
              private auth: AuthenticationService,
              private route: Router) { }

  ngOnInit() {
    this.backgroundService.backGroundChanges.subscribe(value => {
      this.isBackgroundEnabled = value;
    });

    this.modal.currentModalState.subscribe(display => this.displayModal = display);

    this.items = [

        {
          label: 'user',
          icon: 'pi pi-user-edit',
          routerLink: '/personal-space/user-info'
        },
        {
          label: 'mes jardins',
          icon: 'pi pi-pw pi-file',
          routerLink: '/personal-space/my-gardens'
        },
        {
          label: 'messagerie',
          icon: 'pi pi-comment',
          routerLink: '/personal-space/messages'
        }
    ];
  }

  showModalDialog() {
    this.modal.showModalDialog();
  }

  localStorageEmpty() {
    if (localStorage.getItem('userToken') == null && localStorage.getItem('synToken') == null) {
      this.isUserNotConnected = true;
    }

    if (localStorage.getItem('userToken') != null && localStorage.getItem('synToken') != null) {
      this.isUserNotConnected = false;
    }

    return this.isUserNotConnected;

  }

  getAvatar() {
    if (localStorage.getItem('avatarURL') !== 'urltoavatar') {
      return `url(${localStorage.getItem('avatarURL')})`;
    } else { return  `url(../../../assets/img/defaultavatar.png)`; }
  }

  logOutUser() {
    this.auth.logout();
  }


}
