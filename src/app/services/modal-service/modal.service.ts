import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  displayModal = new BehaviorSubject<boolean>(null);
  currentModalState = this.displayModal.asObservable();

  constructor() { }

  showModalDialog() {
    this.displayModal.next(true);
  }

  closeDialog() {
    this.displayModal.next(false);
  }


}
