import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Garden} from '../../@entities/garden';
import {BackgroundService} from '../../services/backgroud-service/background.service';
import {GardensService} from '../../services/gardens/gardens.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit, AfterViewInit, OnDestroy {
  ADDS_MAX_LENGTH = 4;
  gardens: Garden[] = [];
  isSearch = false;

  constructor(private backgroundService: BackgroundService,
              private elementRef: ElementRef,
              private gardensService: GardensService) {
  }

  ngOnInit() {
    this.getGardens();
  }

  ngAfterViewInit() {
    this.backgroundService.enableBackGround(this.elementRef);
  }

  selectFirstAdds(gardens: Garden[], count: number): void {
    this.gardens = [];
    let max = this.ADDS_MAX_LENGTH;
    if (count < this.ADDS_MAX_LENGTH) {
      max = count;
    }
    for (let i = 0; i < max; i++) {
      this.gardens.push(gardens[i]);
    }
  }

  getGardens() {
    this.isSearch = false;
    this.gardensService.getGardens().subscribe((result: { data: Garden[]; count: number; }) => {
      if (result && result.data) {
        console.log(result.data);
        this.selectFirstAdds(result.data, result.count);
      } else {
        this.gardens = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.backgroundService.disableBackGround(this.elementRef);
  }

  isAuth() {
    return localStorage.getItem('userToken');
  }

  onSearch(filters: any) {
    this.gardensService.searchGarden(filters).subscribe((result: { data: Garden[]; count: number; }) => {
      this.isSearch = true;
      this.gardens = [];
      if (result && result.data) {
        result.data.forEach(garden => {
          this.gardens.push(garden);
        });
      }
    });
  }
}
