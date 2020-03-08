import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  isBackGroundEnabled = false;
  backGroundChanges: BehaviorSubject<boolean>;

  constructor() {
    this.backGroundChanges = new BehaviorSubject<boolean>(this.isBackGroundEnabled);

  }

  enableBackGround(elementRef) {
    this.isBackGroundEnabled = true;
    this.backGroundChanges.next(this.isBackGroundEnabled);
    elementRef.nativeElement.ownerDocument.body.style.backgroundImage = 'url("../../../assets/img/background.jpg")';
  }

  disableBackGround(elementRef) {
    this.isBackGroundEnabled = false;
    this.backGroundChanges.next(this.isBackGroundEnabled);
    elementRef.nativeElement.ownerDocument.body.style.backgroundImage = '';
  }

}
