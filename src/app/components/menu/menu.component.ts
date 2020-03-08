import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BackgroundService} from '../../services/backgroud-service/background.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isUserNotConnected = true;
  isBackgroundEnabled = false;
  constructor(private backgroundService: BackgroundService) { }

  ngOnInit() {
    this.backgroundService.backGroundChanges.subscribe(value => {
      this.isBackgroundEnabled = value;
    });
  }

}
