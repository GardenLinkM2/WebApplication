import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {

  constructor() { }
  activateFields = false;
  ngOnInit() {
  }
  switchFieldState() {
    this.activateFields = true;
  }

  saveChanges() {
    this.activateFields = false;
  }

  cancelAction() {
    this.activateFields = false;
  }
}
