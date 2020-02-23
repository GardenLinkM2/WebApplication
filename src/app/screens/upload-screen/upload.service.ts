import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {TokenInterceptor} from './upload-interceptor';

interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url = 'https://devbackendm2.artheriom.fr/api/Gardens';
  private urlsyn = 'https://devbackendm2.artheriom.fr/api/syn';
  private body: {};
  private bearerToken: Token;
  private token: Token;
  private owner: any;
  private req: HttpRequest<any>;
  private tokeninterceptor = new TokenInterceptor();
  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'});
  private options = { headers: this.headers };
  constructor(private next: HttpHandler) { }
  getBearerToken() {
      this.token = {
        token: 'eyJraWQiOiJnYXJkZW5saW5rIiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiJyaWNreWJsYWNrd2FsbEBnbWFpbC5jb20iL' +
        'CJraWQiOiJnYXJkZW5saW5rIiwiaXNBZG1pbiI6ZmFsc2UsImV4cCI6MTU4NDQzOTYyNywidXVpZCI6IjkwYTVmY2NjLTVkZTktNGQyZS1iMjYwLTNjYjkwY2I' +
        '4M2E5YSIsImVtaXR0ZXIiOiJnYXJkZW5saW5rIiwianRpIjoiN2ZiNzc2MTAtOTg3OS00NDNkLTk1MWYtNTkxYjFiNjM4MTBjIn0._D-CS0Bi4ZTSn3K56ogZy' +
        'EIS4wdf4xH1usI27BhnPDpGUkc_5vs_FDndk_h2mlbJ4594hkISpmbc1PEZnoYcbQ'
      };
      this.req = new HttpRequest<any>('POST', this.urlsyn, this.token);
      this.tokeninterceptor.intercept(this.req, this.next).subscribe(
        data => console.log('success', data),
        error1 => console.log('fail', error1)
      );
  }
  postGarden(userForm: FormGroup) {
    this.getBearerToken();
    this.req = new HttpRequest('GET', 'https://devbackendm2.artheriom.fr/api/me');
    this.tokeninterceptor.intercept(this.req, this.next).subscribe(
      me => this.owner = me,
      fail => console.log('error ', fail)
    );
    this.body = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: userForm.get('title').value,
      size: 0,
      reserve: false,
      type: userForm.get('soilType').value,
      minUse: userForm.get('durationMax').value,
      owner: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      validation: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        state: 0
      },
      criteria: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        locationTime: {},
        area: userForm.get('surface').value,
        price: userForm.get('price').value,
        location: {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        },
        orientation: userForm.get('orientation').value,
        typeOfClay: userForm.get('soilType').value,
        equipments: userForm.get('accessTools').value,
        waterAccess: userForm.get('accessWater').value,
        directAccess: userForm.get('directAccess').value
      },
      photos: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          fileName: 'string'
        }
      ]
    };
    this.req = new HttpRequest('POST', this.url, this.body);
    return this.tokeninterceptor.intercept(this.req, this.next);
  }

}
