import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MdpService {
  private url = environment.urlAuth + 'lostpassword/';
  constructor(private client: HttpClient) { }
  recover(userForm: FormGroup) {
    return this.client.get<any>(this.url + userForm.get('emailControl').value);
  }
}
