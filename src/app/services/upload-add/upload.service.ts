import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UploadAdBody} from '../../@entities/adUploadBody';

// TODO: move interface to entities, service should only execute requests

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url = environment.url + 'api/Gardens';
  constructor(private client: HttpClient) { }
  getId() {
    return this.client.get(environment.url + 'api/Users/me');
  }
  postGarden(requestBody: UploadAdBody) {
    return this.client.post(this.url, requestBody);
  }

}
