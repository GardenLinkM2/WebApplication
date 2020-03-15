import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {NavbarComponent} from '../../../components/navbar/navbar.component';
import {Router} from '@angular/router';
import {BackgroundService} from "../../../services/backgroud-service/background.service";

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.scss']
})
export class PersonalSpaceComponent implements OnInit, AfterViewInit {

  constructor(private backgroundService: BackgroundService, private elementRef: ElementRef,  private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.backgroundService.enableBackGround(this.elementRef);
  }


}
