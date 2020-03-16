import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Leasing } from 'src/app/@entities/leasing';
import { Garden } from 'src/app/@entities/garden';
import { GardensService } from '../../services/gardens/gardens.service';
import { UserService } from '../../services/user-info/user.service';
import { LeasingService } from '../../services/leasing/leasing.service';
import { State } from 'src/app/@entities/enum/state.enum';
import { Payment } from 'src/app/@entities/payment';


@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss'],
  providers: [
    ConfirmationService
  ]
})
export class DemandComponent implements OnInit {

  @Output() treated = new EventEmitter<any>();

  @Input() leasing: Leasing = {
    id: '',
    begin: 0,
    end: 0,
    time: 0,
    creation: 0,
    renew: false,
    renter: '',
    owner: '',
    garden: '',
    state: ''
  };

  price: number;

  garden: Garden = {
    id: '',
    description : '',
    name: '',
    minUse: 0,
    isReserved : false,
    owner: '',
    photos : [],
    location : {
      streetNumber : 0,
      street: '',
      city: '',
      postalCode: 0,
      longitudeAndLatitude: {
        latitude: 0,
        longitude: 0
      }
    },
    validation : '',
    criteria : {
      id: '',
      area: 0,
      directAccess: false,
      equipments: false,
      typeOfClay: '',
      waterAccess: false,
      price: 0,
      locationTime: null,
      orientation: ''
    }
  };

  user: any = {

  };

  payment: Payment = {
    id: '',
    sum: 0,
    date: null,
    leasing: ''
  };

  constructor(private leasingS: LeasingService , private userS: UserService,
              private gardenS: GardensService, private confirmationService: ConfirmationService) { }

  async ngOnInit() {
    await this.gardenS.getGardenById(this.leasing.garden).subscribe(
      Response => {
        // @ts-ignore
        this.garden = Response.data;
      },
      error => {
        console.log(error);
      }
    );

    await this.userS.getUserById(this.leasing.renter).toPromise().then(
      Response => {
        this.user = Response;
      }
    );
  }

  pickAvatar() {
    return this.user.avatar === '' ? 'assets/img/defaultavatar.png' : this.user.avatar;
  }

  treat(id: string, action: string, user: string) {
    this.treated.emit(
      {
        id,
        action,
        user
      }
    );
  }

  acceptConfirm() {
    this.confirmationService.confirm({
        message: 'Veuillez confirmer votre acceptation.',
        header: null,
        icon: null,
        accept: () => {
          this.leasing.state = State.InProgress;
          this.leasing.begin = Math.floor((new Date().getTime()) / 1000);
          this.leasing.end = this.leasing.begin + this.leasing.time * (2.628) * 10 ** 6;
          this.leasingS.treatLeasing(this.leasing.id, this.leasing).subscribe(
            Response => {
              this.payment.leasing = this.leasing.id;
              this.payment.sum = this.leasing.time * this.garden.criteria.price;
              this.payment.date = new Date();
              this.payment.id = this.leasing.id;
              this.leasingS.payLeasing(this.payment).subscribe(
                () => {  }
              );
              // @ts-ignore
              this.treat(Response.data.id, 'accept', this.user.firstName);
            },
            error => {
              console.log(error);
            }
          );
        }
    });
  }

  refuseConfirm() {
    this.confirmationService.confirm({
        message: 'Veuillez confirmer votre rejet.',
        header: null,
        icon: null,
        accept: () => {
            this.leasing.state = State.Refused;
            this.leasingS.treatLeasing(this.leasing.id, this.leasing).toPromise().then(
              Response => {
                // @ts-ignore
                this.treat(Response.data.id, 'refuse', this.user.firstName);
              }
            );
        }
    });
  }
}
