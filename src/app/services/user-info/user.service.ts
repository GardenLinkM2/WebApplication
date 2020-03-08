import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private urlback = 'https://devbackendm2.artheriom.fr/api/';
  private urlauth = 'https://devauthm2.artheriom.fr/';
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
}
