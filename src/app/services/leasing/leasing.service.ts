import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Leasing } from 'src/app/@entities/leasing';

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
}
