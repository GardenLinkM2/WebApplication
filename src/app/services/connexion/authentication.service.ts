import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ConnexionData } from './../../@entities/connexionData';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  login(userForm: FormGroup) {

    const email = 'mail';
    const password = 'password';

    const data: ConnexionData = {
      clientId: 'gardenlink',
      email: userForm.controls[email].value as string,
      password: userForm.controls[password].value as string
    };


    return this.http.post<any>(environment.urlAuth + 'auth/token', data);
  }

   syn(accessTok: string) {

    return this.http.post<any>(environment.url + 'api/syn', {token: accessTok});

  }

  tokenIntroscpection(accessTok: string) {
    return this.http.post<any>(environment.urlAuth + 'token/introspect', {token: accessTok});
  }


  logout() {

    localStorage.removeItem('synToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('avatarURL');
  }

}
