import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RecoverPwdService {
  url = 'https://devauthm2.artheriom.fr/newpassword/';
  private token: any;
  constructor(private client: HttpClient, private activatedRoute: ActivatedRoute) { }
  reinitpass(userForm: FormGroup) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params.token;
    });
    return this.client.post<any>(this.url + this.token, userForm.get('password').value);
  }
}
