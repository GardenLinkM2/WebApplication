import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Leasing } from 'src/app/@entities/leasing';
import { map } from 'rxjs/operators';
import { State } from "../../@entities/enum/state.enum";
import { Payment } from 'src/app/@entities/payment';

@Injectable({
  providedIn: 'root'
})
export class LeasingService {

  private urlback = `${environment.url}api/`;

  constructor(private client: HttpClient) { }

  postNewLeasing(leasingDemand : Leasing) {
    return this.client.post(this.urlback + `Leasing` , leasingDemand);
  }

  getUserMe() {
    return this.client.get(this.urlback + `users/me`);
  }

  getDemands(owner : string) {
    return this.client.get(this.urlback + `Leasing/me`).pipe(
      map(responses => responses["data"].filter(l => l.state === State.InDemand && l.owner === owner) ),
    );
  }

  treatLeasing(idLeasing : string, leasing : Leasing) {
    return this.client.put(this.urlback  + `Leasing/${idLeasing}`, leasing);
  }

  payLeasing(payment : Payment) {
    return this.client.post(this.urlback + `Payments`, payment);
  }
}
