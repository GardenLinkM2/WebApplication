import { LeasingService } from './../../services/leasing/leasing.service';
import { User } from './../../@entities/user';
import {Component, Input, OnInit} from '@angular/core';
import {Garden} from '../../@entities/garden';
import { UserService } from 'src/app/services/user-info/user.service';
import { Leasing } from 'src/app/@entities/leasing';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss']
})
export class AdCardComponent implements OnInit {

  @Input() garden: Garden;
  @Input() hasRenter: boolean;
  renterID: string;
  avatar = 'assets/img/defaultavatar.png';
  firstName: string;
  lastName: string;
  displayModal: boolean;
  debut: string;
  fin: string;
  time: number;
  price: number;

  baseImage = '../../../assets/img/default-garden.png';

  constructor(private userService: UserService, private leasingService: LeasingService) { }

  async ngOnInit() {

    await this.leasingService.getUserLeasings().toPromise().then(
      (result: {data: Leasing[]; count: number; }) => {
        for (let i = 0; i < result.count; i++) {
          if (result.data[i].garden === this.garden.id) {
            this.renterID = result.data[i].renter;
            this.debut = new Date(result.data[i].begin * 1000).toDateString();
            this.fin = new Date(result.data[i].end * 1000).toDateString();
            this.time = (((result.data[i].time / 3600) / 24) / 30);
            this.price = this.garden.criteria.price * this.time;
            this.userService.getUserById(this.renterID).toPromise().then(
              (response: User) => {
                if (response.avatar.includes('/uploadm2.artheriom.fr')) {
                  this.avatar = response.avatar;
                }
                this.firstName = response.firstName;
                this.lastName = response.lastName;
              },
              () => console.log('Error Fetching contact')
            );
          }
        }
      }
    );


  }

  showModalDialog() {
    this.displayModal = true;
  }

}
