import { logging } from 'protractor';
import { LeasingService } from './../../services/leasing/leasing.service';
import { GardensService } from './../../services/gardens/gardens.service';
import { UserService } from './../../services/user-info/user.service';
import { Garden } from 'src/app/@entities/garden';
import { Component, OnInit } from '@angular/core';
import { Leasing } from 'src/app/@entities/leasing';


@Component({
  selector: 'app-mes-jardins',
  templateUrl: './mes-jardins.component.html',
  styleUrls: ['./mes-jardins.component.scss']
})
export class MesJardinsComponent implements OnInit {

  ADDS_MAX_LENGTH = 4;
  gardens: Garden[] = [];
  locations: Garden[] = [];
  demandes: Garden[] = [];
  gardenId: string[] = [];
  rentedGardenId: string[] = [];
  leaselist: Leasing[];

  constructor(private userService: UserService,
              private gardenService: GardensService,
              private leasingService: LeasingService) { }

  async ngOnInit() {

    this.getGardens();

    await this.leasingService.getUserLeasings().toPromise().then((result: {data: Leasing[]; count: number; }) => {
      this.getGardenIdByLeasing(result.data, result.count);
    });

    this.getRentedGardens();
      console.log(this.rentedGardenId);


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
    this.userService.getUserGardens().subscribe((result: { data: Garden[]; count: number; }) => {
      if (result && result.data) {
        //console.log(result.data);
        this.selectFirstAdds(result.data, result.count);
      } else {
        this.gardens = [];
      }
    });
  }

  async getLeasing() {
    await this.leasingService.getUserLeasings().toPromise().then((result: {data: Leasing[]; count: number; }) => {
      this.getGardenIdByLeasing(result.data, result.count);
    });
  }

  getGardenIdByLeasing(lease: Leasing[], size: number) {
    console.log(lease);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < size; i++) {
      if (lease[i].state !== 'Refused') {
      console.log(lease[i].garden);
      this.rentedGardenId.push(lease[i].garden);
      }
    }
  }

  getRentedGardens() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i< this.rentedGardenId.length; i++) {
      this.gardenService.getGardenById(this.rentedGardenId[i]).subscribe((result: {data: Garden}) => {
        console.log(result);
        this.separateDemandeAndLocation(result.data);
      });
    }
  }

  separateDemandeAndLocation(garden: Garden) {
    if (garden.isReserved === false) {
      this.demandes.push(garden);
    } else {
      this.locations.push(garden);
    }
  }

}
