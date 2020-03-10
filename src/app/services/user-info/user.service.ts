import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private urlback = `${environment.url}api/`;
  private urlauth = environment.urlAuth;
  constructor(private client: HttpClient) {}
  getUserWallet() {
    return this.client.get(this.urlback + 'Wallets/me');
  }
  getUserInfoAuth() {
    return this.client.get(this.urlauth + `users/me`);
  }
  updateInformation(id: string, newInformation) {
    return this.client.put(this.urlauth + `users/${id}`, newInformation);
  }
  deleteAccount(id: string) {
    return this.client.delete(this.urlauth + `users/${id}`);
  }
  deleteAccountBack() {
    return this.client.delete(this.urlback + `Users/me`);
  }
}
