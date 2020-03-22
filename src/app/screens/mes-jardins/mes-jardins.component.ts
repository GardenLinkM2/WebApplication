import { logging } from 'protractor';
import { LeasingService } from './../../services/leasing/leasing.service';
import { GardensService } from './../../services/gardens/gardens.service';
import { UserService } from './../../services/user-info/user.service';
import { Garden } from 'src/app/@entities/garden';
import { Component, OnInit } from '@angular/core';
import { Leasing } from 'src/app/@entities/leasing';
import { count } from 'rxjs/operators';


@Component({
  selector: 'app-mes-jardins',
  templateUrl: './mes-jardins.component.html',
  styleUrls: ['./mes-jardins.component.scss']
})
export class MesJardinsComponent implements OnInit {

  ADDS_MAX_LENGTH = 5;
  gardens: Garden[] = [];
  locations: Garden[] = [];
  demandes: Garden[] = [];
  gardenId: string[] = [];
  rentedInDemand: string[] = [];
  rentedInProgress: string[] = [];
  leaselist: Leasing[];
  showSpinner = true;
  ownerGardens: string[] = [];

  constructor(private userService: UserService,
              private gardenService: GardensService,
              private leasingService: LeasingService) { }

  async ngOnInit() {

    this.getGardens();

  }

  selectFirstAdds(gardens: Garden[], count: number): void {
    this.gardens = [];
    const max = count;
    for (let i = 0; i < max; i++) {
      this.gardens.push(gardens[i]);
    }
  }

  getGardens() {
    this.showSpinner = true;
    this.userService.getUserGardens().subscribe((result: { data: Garden[]; count: number; }) => {
      if (result && result.data) {
        this.selectFirstAdds(result.data, result.count);
      } else {
        this.gardens = [];
      }
      this.leasingService.getUserLeasings().toPromise().then((result: {data: Leasing[]; count: number; }) => {
        this.getGardenIdByLeasing(result.data, result.count);
        this.showMyRentedGardens();
      });

      this.getRentedGardens();
      this.showSpinner = false;
    });
  }

  async getLeasing() {
    await this.leasingService.getUserLeasings().toPromise().then((result: {data: Leasing[]; count: number; }) => {
      this.getGardenIdByLeasing(result.data, result.count);
    });
  }

  getGardenIdByLeasing(lease: Leasing[], size: number) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < size; i++) {
      if (lease[i].state === 'InDemand' && lease[i].renter === localStorage.getItem('id')) {
        this.rentedInDemand.push(lease[i].garden);
      }

      if (lease[i].state === 'InProgress' && lease[i].renter === localStorage.getItem('id')) {
        this.rentedInProgress.push(lease[i].garden);
      }

      if (lease[i].state === 'InProgress' && lease[i].owner === localStorage.getItem('id')) {
        this.ownerGardens.push(lease[i].garden);
      }
    }
  }

  getRentedGardens() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.rentedInDemand.length; i++) {
      this.gardenService.getGardenById(this.rentedInDemand[i]).subscribe((result: {data: Garden}) => {
        this.demandes.push(result.data);
      });
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.rentedInProgress.length; i++) {
      this.gardenService.getGardenById(this.rentedInProgress[i]).subscribe((result: {data: Garden}) => {
        this.locations.push(result.data);
      });
    }
  }

  showMyRentedGardens() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < this.gardens.length; i++) {
      if (this.ownerGardens.indexOf(this.gardens[i].id) !== -1) {
        this.gardens[i].isReserved = true;
      }
    }

  }

}
