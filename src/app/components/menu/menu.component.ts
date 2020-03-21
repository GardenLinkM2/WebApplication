import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/connexion/authentication.service';
import {ModalService} from '../../services/modal-service/modal.service';
import {Component, OnInit} from '@angular/core';
import {BackgroundService} from '../../services/backgroud-service/background.service';
import {MenuItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {LeasingService} from '../../services/leasing/leasing.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [
    MessageService
  ]
})
export class MenuComponent implements OnInit {

  isUserNotConnected = true;
  isBackgroundEnabled = false;
  displayModal: boolean;
  newDemand = false;
  items: MenuItem[];

  constructor(private backgroundService: BackgroundService,
              private modal: ModalService,
              private auth: AuthenticationService,
              private route: Router,
              private messageService: MessageService,
              private leasingService: LeasingService) {
  }

  async ngOnInit() {
    
    this.checkNotif();

    this.backgroundService.backGroundChanges.subscribe(value => {
      this.isBackgroundEnabled = value;
    });

    this.modal.currentModalState.subscribe(display => this.displayModal = display);

    this.items = [

      {
        label: 'Mon profil',
        icon: 'pi pi-user-edit',
        routerLink: '/espace-personel/mes-info'
      },
      {
        label: 'Mes jardins',
        icon: 'pi pi-pw pi-file',
        routerLink: '/espace-personel/mes-jardins'
      },
      {
        label: 'Mes messages',
        icon: 'pi pi-comment',
        routerLink: '/espace-personel/messages'
      },
      {
        label: 'Demandes reçues',
        icon: 'pi pi-inbox',
        routerLink: '/consulter-demandes',
      }
    ];
  }

  checkNotif(){
    setTimeout(
      async () => {
      if (localStorage.getItem('synToken')) {
        await this.leasingService.getDemands(localStorage.getItem('id')).subscribe(
          response => {
            if (response.length !== 0) {
              this.newDemand = true;
            }
            else {
              this.newDemand = false;
            }
          }
        );
      }
      this.checkNotif();
    }, 30000);
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
    if (localStorage.getItem('avatarURL') !== 'urltoavatar' && localStorage.getItem('avatarURL') !== '') {
      return `url(${localStorage.getItem('avatarURL')})`;
    } else {
      return `url(../../../assets/img/defaultavatar.png)`;
    }
  }

  getFirstName() {
    return localStorage.getItem('firstName');
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'c', sticky: true, severity: 'warn', summary: 'Déconnexion',
      detail: 'êtes-vous sûr de vouloir vous déconnecter'
    });
  }

  onConfirm() {
    this.messageService.clear('c');
    this.logOutUser();
  }

  onReject() {
    this.messageService.clear('c');
  }

  logOutUser() {
    this.auth.logout();
  }


}
