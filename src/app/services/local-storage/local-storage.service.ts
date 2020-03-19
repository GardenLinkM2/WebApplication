import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ILocalStorage} from '../../@entities/i-local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageSub = new Subject<ILocalStorage>();
  constructor() { }
  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    const seted = {key, data};
    localStorage.setItem(key, data);
    this.storageSub.next(seted);
  }
}
