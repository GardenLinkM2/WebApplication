import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RecoverPwdService {

  url = 'https://devauthm2.artheriom.fr/lostpassword/';
  constructor(private client: HttpClient) { }
  reinitpass(userForm: FormGroup) {
    return this.client.post<any>(this.url, userForm.get('password').value);
  }
}
