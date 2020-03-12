import { ModalService } from './../../services/modal-service/modal.service';
import {AfterViewInit, Component, OnInit, Input} from '@angular/core';
import {BackgroundService} from '../../services/backgroud-service/background.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isUserNotConnected = true;
  isBackgroundEnabled = false;
  displayModal: boolean;

  constructor(private backgroundService: BackgroundService, private modal: ModalService) { }

  ngOnInit() {
    this.backgroundService.backGroundChanges.subscribe(value => {
      this.isBackgroundEnabled = value;
    });

    this.modal.currentModalState.subscribe(display => this.displayModal = display);
  }

  showModalDialog() {
    this.modal.showModalDialog();
  }


}
