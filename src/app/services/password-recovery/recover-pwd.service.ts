import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RecoverPwdService {
  private url = environment.urlAuth + 'newpassword/';
  constructor(private client: HttpClient) { }
  reinitpass(userForm: FormGroup, token: string) {
    return this.client.post<any>(this.url + token, { password: userForm.get('password').value});
  }
}
