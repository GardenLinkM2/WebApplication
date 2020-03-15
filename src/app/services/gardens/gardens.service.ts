import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GardensService {

  private urlback = `${environment.url}api/`;

  constructor(private client: HttpClient) { }

  getGardenById(id : string) {
    return this.client.get(this.urlback + `Gardens/${id}`);
  }

}
