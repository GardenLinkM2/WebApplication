import { UserData } from '../../@entities/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  url = environment.urlAuth + 'users';
  private urlCaptcha = 'https://www.google.com/recaptcha/api/siteverify';
  private secretToken = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

  constructor(private httpClient: HttpClient) { }

  enroll(user: FormGroup) {

    const firstname = 'firstName';
    const lastname = 'lastName';
    const password = 'password';
    const phone = 'phone';
    const email = 'email';
    const newsletter = 'newsletter';

    const toSend: UserData = {
      firstName: user.controls[firstname].value as string,
      lastName: user.controls[lastname].value as string,
      password: user.controls[password].value as string,
      phone: user.controls[phone].value as string,
      email: user.controls[email].value as string,
      newsletter: user.controls[newsletter].value
    };

    return this.httpClient.post<any>(this.url, toSend);
  }

}
