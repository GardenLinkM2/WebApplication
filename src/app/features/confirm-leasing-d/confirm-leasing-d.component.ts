import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

import { UserService } from "../../services/user-info/user.service";
import { GardensService } from "../../services/gardens/gardens.service";
import { LeasingService } from "../../services/leasing/leasing.service";
import { Location } from "@angular/common";
import { Leasing } from 'src/app/@entities/leasing';
import { State } from 'src/app/@entities/enum/state.enum';
import { Wallet } from 'src/app/@entities/wallet';
import { Garden } from 'src/app/@entities/garden';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-confirm-leasing-d',
  templateUrl: './confirm-leasing-d.component.html',
  styleUrls: ['./confirm-leasing-d.component.scss'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})

export class ConfirmLeasingDComponent implements OnInit {

  constructor(private messageService: MessageService,private leasinService : LeasingService,
    private _location: Location, private router: Router,
    private confirmationService: ConfirmationService, private userService : UserService ,
    private gardenService : GardensService) { }

  async ngOnInit() {
    await this.userService.getUserWallet().toPromise().then(
      response => {
        this.wallet.amount = response["data"].balance;
      },
      error => {
        console.log(error)
      }
    );

    await this.gardenService.getGardenById("08d7c849-fccf-46b3-8840-0268b7617e56").toPromise().then(
      response => {
        console.log(response);
        this.garden.id = response["data"].id;
        this.garden.name = response["data"].name;
        this.garden.isReserved = response["data"].isReserved;
        this.garden.minUse = response["data"].minUse;
        this.garden.owner = response["data"].owner;
        this.garden.validation = response["data"].validation;
        this.garden.location = {
          street : response["data"].location.street,
          streetNumber : response["data"].location.streetNumber,
          city : response["data"].location.city,
          postalCode : response["data"].location.postalCode,
          longitudeAndLatitude : {
            longitude : response["data"].location.longitudeAndLatitude.longitude,
            latitude : response["data"].location.longitudeAndLatitude.latitude
          }
        }
        this.garden.criteria = {
          id : response["data"].criteria.id,
          price : response["data"].criteria.price,
          area : response["data"].criteria.area,
          directAccess : response["data"].criteria.directAccess,
          equipments : response["data"].criteria.equipments,
          locationTime : response["data"].criteria.locationTime,
          orientation : response["data"].criteria.orientation,
          typeOfClay : response ["data"].criteria.typeOfClay,
          waterAccess : response["data"].criteria.waterAccess
        };
        this.garden.photos = response["data"].photos;
      }
    );

    await this.leasinService.getUserMe().toPromise().then(
      response => {
        this.myId = response["data"].id;
      }
    );

    this.max = Math.min(this.garden.minUse, (this.wallet.amount / this.garden.criteria.price));

  }

  garden : Garden = {
    id: "",
    name: "Mon beau jardin",
    isReserved: false,
    minUse: null,
    owner: null,
    validation: null,
    criteria: {
      id : "",
      price: null,
      area: null,
      directAccess: true,
      equipments: true,
      locationTime: null,
      orientation: null,
      typeOfClay: null,
      waterAccess: true
    },
    photos: null,
    description : "",
    location : {
      city : "",
      postalCode: null,
      street : "",
      streetNumber : null,
      longitudeAndLatitude: null
    }
  }

  wallet : Wallet = {
    id : "",
    amount : null
  };

  max : number;

  sendDemandForm = new FormGroup({
    time : new FormControl('', [
      Validators.required,
      Validators.max(this.max),
      Validators.min(1),
      Validators.pattern('^[0-9]*$')
    ])
  })

  myId : string;

  demand : Leasing;

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
    
  onSubmit() {
    this.demand = {
      id : this.garden.id,
      creation : Date.now(),
      time : this.sendDemandForm.get('time').value,
      begin : 0,
      end : 0,
      renew : false,
      state : State.InDemand,
      garden : this.garden.id,
      renter : this.myId,
      owner : this.garden.owner
    }
    this.confirm();
  }

  abort() {
    this._location.back();
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Veuillez confirmer votre demande.',
        accept: () => {
            console.log(this.demand);
            this.leasinService.postNewLeasing(this.demand).subscribe(
              () => {
                this.messageService.add({severity: 'success', summary: 'OK ',detail: 'Votre demande a été envoyée.'});
                setTimeout( () => this._location.back(), 2000);
              },
              error => {
                console.error(error);
                this.messageService.add({severity: 'error', summary: 'ERREUR ',detail: 'Votre demande n\'a pas été envoyée.'});
              }
            );
            
        },
        reject: () => {
          this.messageService.add({severity: 'info', summary: 'Info: ', detail: 'L\'ajout a été annulé.'})
        }
    });
  }

  isWaterAvailable(){
    return this.garden.criteria.waterAccess?"Oui":"Non";
  }

  isEquipmentAvailable(){
    return this.garden.criteria.equipments?"Oui":"Non";
  }

  isDirectlyAccessible(){
    return this.garden.criteria.directAccess?"Oui":"Non";
  }

}
