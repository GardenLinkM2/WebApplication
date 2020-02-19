import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MdpService {
  url = 'https://devbackendm2.artheriom.fr/api/lostpassword/';
  constructor(private client: HttpClient) { }
  recover(userForm: FormGroup) {
    return this.client.get<any>(this.url + userForm.get('emailControl').value);
  }
}
