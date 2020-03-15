import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UploadAdBody} from '../../@entities/adUploadBody';

// TODO: move interface to entities, service should only execute requests

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private client: HttpClient) { }
  getId() {
    return this.client.get(environment.url + 'api/Users/me');
  }
  postGarden(requestBody: UploadAdBody) {
    return this.client.post(environment.url + 'api/Gardens', requestBody);
  }
  getGardenbyId(id) {
    return this.client.get(environment.url + `api/Gardens/${id}`);
  }
  modifyGarden(requestBody: UploadAdBody, id) {
    requestBody.id = id;
    return this.client.put(environment.url + `api/Gardens/${id}`, requestBody);
  }
}
