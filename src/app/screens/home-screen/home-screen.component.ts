import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Garden} from '../../@entities/garden';
import {BackgroundService} from '../../services/backgroud-service/background.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit, AfterViewInit, OnDestroy {
  ADDS_MAX_LENGTH = 4;
  gardens: any[];

  constructor(private backgroundService: BackgroundService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.getGardens();
    this.selectFirstAdds();
  }

  ngAfterViewInit() {
    this.backgroundService.enableBackGround(this.elementRef);
  }

  selectFirstAdds(): Garden[] {
    return this.gardens.slice(0, this.ADDS_MAX_LENGTH);
  }

  getGardens() {
    const garden = {id: '1', minUse: 12, name: 'Beau Jardin', owner: 'JL Picard', reserve: false, size: 123, type: 'type',
      validation: {id: '12', state: 12},
      criteria:
        {
          id: '1',
          location: {id: 'belle adresse'},
          price: 100,
          area: 120,
          directAccess: true,
          equipments: true,
          locationTime: undefined,
          orientation: 'orienté',
          typeOfClay: 'typé',
          waterAccess: true
        },
      photos: undefined
    };
    this.gardens =
      [
        garden, garden, garden, garden, garden
      ];
  }

  ngOnDestroy(): void {
    this.backgroundService.disableBackGround(this.elementRef);
  }

  isAuth() {
  return localStorage.getItem('userToken');
  }
}
