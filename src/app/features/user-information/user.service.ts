import { Injectable } from '@angular/core';
import { TokenInterceptor } from '../../req-interceptor';
import {HttpRequest, HttpHandler, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private urlback = 'https://devbackendm2.artheriom.fr/api/';
  private urlauth = 'https://devauthm2.artheriom.fr/';
  private req: HttpRequest<any>;
  private tokeninterceptor = new TokenInterceptor();
  constructor(private next: HttpHandler) {}
  getUserInfo() {
    this.req = new HttpRequest('GET', this.urlback + 'Users/me'); // Garden upload request
    return this.tokeninterceptor.intercept(this.req, this.next);
  }
  getUserInfoAuth(id: string) {
    this.req = new HttpRequest('GET', this.urlauth + `users/${id}`,
      { headers: new HttpHeaders({Authorization: 'eyJraWQiOiJhY2NvdW50IiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiJyaWNreWJs' +
            'YWNrd2FsbEBnbWFpbC5jb20iLCJraWQiOiJhY2NvdW50IiwiaXNBZG1pbiI6ZmFsc2UsImV4cCI6MTU4NTA2NTI1OSwidXVpZCI6IjkwYTVmY2NjL' +
            'TVkZTktNGQyZS1iMjYwLTNjYjkwY2I4M2E5YSIsImVtaXR0ZXIiOiJhY2NvdW50IiwianRpIjoiNGZjNjE2YTUtOGU2Ni00NTNlLTg3ZDEtODQzOG' +
            'I2NTBhMTZkIn0.qwtdLojoNcoA41OKzGL76AvDttwcqoAWd-PIglZw_Q7HR07KihchBM8Au4TRvbImwMd3pPhr0CibHwnT7PWuEQ'})});
    return this.next.handle(this.req);
  }

  authenticate() {
    this.req = new HttpRequest<any>('POST', this.urlauth + 'auth/token', {
      clientId: 'gardenlink',
      email: 'rickyblackwall@gmail.com',
      password: 'mahadiEric'
    });
    return this.next.handle(this.req);
  }
  deleteAccount(id: string) {
    this.req =  new HttpRequest<any>('DELETE', this.urlauth + `users/${id}`);
  }
}
