import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user-info/user.service';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ConfirmationService, Message} from 'primeng/api';
import {UpdatedInfo} from '../../@entities/updateInfo';
import {comparisonValidator} from '../../services/validators/cofirm-password';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
  providers: [ConfirmationService]
})

export class UserInformationComponent implements OnInit {
  constructor(private userService: UserService, private confirmationService: ConfirmationService, private router: Router) { }
  firstname: string;
  lastname: string;
  balance: number;
  id: string;
  passwordLabel: string;
  msgs: Message[] = [];
  activateFields: boolean;
  avatar = 'assets/img/defaultavatar.png';
  editingPassword: boolean;
  newInformation: UpdatedInfo;
  displaySuccessSuppression = false;
  displaySuccessModification: boolean;
  displayChangeImage = false;
  infoForm: FormGroup;

  async ngOnInit() {
    this.newInformation = {
      email: null,
      password: null,
      newsletter: null,
      phone: null
    };
    this.infoForm = new FormGroup({
      password: new FormControl({value: this.newInformation.password}, Validators.required),
      email: new FormControl({value: this.newInformation.email}, [Validators.email, Validators.required]),
      phoneNumber: new FormControl({value: this.newInformation.phone}, Validators.required),
      newsletter: new FormControl({value: this.newInformation.newsletter}),
      confirmPassword: new FormControl({value: null}, Validators.required)
    });
    this.infoForm.setValidators(comparisonValidator());
    this.displaySuccessModification = false;
    this.activateFields = false;
    this.editingPassword = false;
    this.passwordLabel = 'Mot de passe';
    this.infoForm.disable();
    await this.userService.getUserWallet().toPromise().then(
      response => {
        // @ts-ignore
        this.balance = response.data.balance;
      }
    );
    await this.userService.getUserInfoAuth().toPromise().then(
      // @ts-ignore
      responseAuth => {
        // @ts-ignore
        this.firstname = responseAuth.firstName;
        // @ts-ignore
        this.lastname = responseAuth.lastName;
        // @ts-ignore
        this.newInformation.email = responseAuth.email;
        sessionStorage.setItem('email', this.newInformation.email);
        this.infoForm.get('email').setValue(this.newInformation.email);
        // @ts-ignore
        this.newInformation.phone = responseAuth.phone;
        sessionStorage.setItem('phone', this.newInformation.phone);
        this.infoForm.get('phoneNumber').setValue(this.newInformation.phone);
        // @ts-ignore
        this.newInformation.newsletter = responseAuth.newsletter;
        // @ts-ignore
        sessionStorage.setItem('newsletter', responseAuth.newsletter);
        this.infoForm.get('newsletter').setValue(this.newInformation.newsletter);
        // @ts-ignore
        if (responseAuth.avatar !== '' && responseAuth.avatar !== 'urltoavatar') {
          // @ts-ignore
          this.avatar = responseAuth.avatar;
        }
        // @ts-ignore
        this.id = responseAuth.id;
      },
      error => {
        console.log('ERROR', error);
      }
    );
  }
  confirmSuppression() {
    this.confirmationService.confirm({
      message: 'Etes vous sûr de vouloir supprimer le compte?',
      header: 'Suppression',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.userService.deleteAccount(this.id).subscribe(
          () => {
            this.userService.deleteAccountBack().subscribe(
              () => {this.displaySuccessSuppression = true;
                     localStorage.removeItem('synToken');
                     localStorage.removeItem('userToken');
                     localStorage.removeItem('accessToken');
              },
              error => console.log('error', error)
            );
            },
          error => console.log('Failure', error)
        );
        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'Votre compte à été supprimé !!!'}];
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'La suppression du compte à été annulée.'}];
      }
    });
  }

  switchFieldState() {
    this.activateFields = true;
    this.infoForm.get('email').enable();
    this.infoForm.get('phoneNumber').enable();
    this.infoForm.get('newsletter').enable();
  }

  saveChanges() {
    if (!this.infoForm.untouched) {
      this.confirmationService.confirm({
        message: 'Sauvegarder les modifications?',
        header: 'Modification',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
          this.activateFields = false;
          if (this.infoForm.get('password').disabled) {
            this.newInformation = {
              password: undefined,
              phone: this.infoForm.get('phoneNumber').value,
              email: this.infoForm.get('email').value,
              newsletter: this.infoForm.get('newsletter').value,
            };
            delete this.newInformation.password;
          } else {
            this.newInformation = {
              password: this.infoForm.get('password').value,
              phone: this.infoForm.get('phoneNumber').value,
              email: this.infoForm.get('email').value,
              newsletter: this.infoForm.get('newsletter').value,
            };
            this.passwordLabel = 'Mot de passe';
            this.editingPassword = false;
          }
          this.userService.updateInformation(this.id, this.newInformation).subscribe(
            () => {
              this.displaySuccessModification = true;
              sessionStorage.setItem('email', this.newInformation.email);
              sessionStorage.setItem('phone', this.newInformation.phone);
              sessionStorage.setItem('newsletter', this.infoForm.get('newsletter').value); },
            error => console.log('Failure', error)
          );
        },
        reject: () => {
          this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
          this.cancelAction();
        }
      });
    } else { this.cancelAction(); }
  }

  cancelAction() {
    this.activateFields = false;
    this.editingPassword = false;
    this.newInformation = {
      email: sessionStorage.getItem('email'),
      phone: sessionStorage.getItem('phone'),
      newsletter: sessionStorage.getItem('newsletter') === 'true',
      password: '****************'
    };
    this.infoForm.get('phoneNumber').setValue(sessionStorage.getItem('phone'));
    this.infoForm.get('email').setValue(sessionStorage.getItem('email'));
    this.infoForm.get('password').setValue('****************');
    this.displaySuccessModification = false;
    this.infoForm.disable();
  }
  editPassword() {
    if  (this.infoForm.get('password').enabled) {
      this.infoForm.get('password').disable();
      this.infoForm.get('confirmPassword').disable();
      this.editingPassword = false;
      this.passwordLabel = 'Mot de passe';
      this.infoForm.get('password').setValue('****************');
    } else {
      this.infoForm.get('password').enable();
      this.infoForm.get('confirmPassword').enable();
      this.infoForm.get('password').setValue('');
      this.infoForm.get('confirmPassword').setValue('');
      this.editingPassword = true;
      this.passwordLabel = 'Saisir le nouveau mot de passe';
    }
  }

  changeAvatar(event) {
    this.avatar = event.originalEvent.body[0];
    localStorage.setItem('avatarURL', this.avatar);
    this.userService.updateInformation(this.id, {avatar: this.avatar} ).toPromise().then(
      () => this.displayChangeImage = false,
      error => console.log('FAILURE', error)
    );
  }
}
