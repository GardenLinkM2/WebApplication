import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, Message} from 'primeng/api';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
  providers: [ConfirmationService]
})
export class UserInformationComponent implements OnInit {
  constructor(private userService: UserService, private confirmationService: ConfirmationService) { }
  private firstname: string;
  private lastname: string;
  private email: string;
  private balance: number;
  private password: string;
  private phoneNumber: string;
  private msgs: Message[] = [];
  private  activateFields: boolean;
  infoForm = new FormGroup({
    firstname: new FormControl({value: this.firstname}, Validators.required),
    lastname: new FormControl({value: this.lastname}, Validators.required),
    password: new FormControl({value: this.password}, Validators.required),
    email: new FormControl({value: this.email}, [Validators.email, Validators.required]),
    phoneNumber: new FormControl({value: this.phoneNumber}, Validators.required)
  });
  ngOnInit() {
    this.activateFields = false;
    this.infoForm.disable();
    this.userService.getUserInfo().toPromise().then(
      response => {
        // @ts-ignore
        this.firstname = response.body.data.firstName;
        // @ts-ignore
        this.lastname = response.body.data.lastName;
        // @ts-ignore
        this.email = response.body.data.email;
        // @ts-ignore
        this.balance = response.body.data.wallet.balance;
        // @ts-ignore
        this.userService.getUserInfoAuth(response.body.data.id).toPromise().then(
          // @ts-ignore
          responseAuth => {this.phoneNumber = responseAuth.body.phone; },
          error => {console.log('ERROR', error); }
        );
      }
    );
  }

  confirmSuppression() {
    this.confirmationService.confirm({
      message: 'Etes vous sure de vouloir supprimer le compte?',
      header: 'Suppression',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }

  switchFieldState() {
    this.activateFields = true;
    this.infoForm.enable();
  }

  saveChanges() {
    this.confirmationService.confirm({
      message: 'Sauvegarder les modifications?',
      header: 'Modification',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
        this.activateFields = false;
        this.infoForm.disable();
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }

  cancelAction() {
    this.activateFields = false;
    this.infoForm.disable();
  }
}
