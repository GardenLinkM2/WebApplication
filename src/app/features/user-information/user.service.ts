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
    this.req = new HttpRequest('GET', this.urlauth + `users/${id}`);
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
