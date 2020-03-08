import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user-info/user.service';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ConfirmationService, Message} from 'primeng/api';

interface UpdatedInfo {
  'password': string;
  'phone': string;
  'email': string;
  'avatar': string;
  'newsletter': boolean;
}

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
  private  id: string;
  private password = '****************';
  private passwordLabel: string;
  private phoneNumber: string;
  private msgs: Message[] = [];
  private  activateFields: boolean;
  private editingPassword: boolean;
  private newInformation: UpdatedInfo;
  private displaySuccessSuppression = false;
  private displaySuccessModification: boolean;
  infoForm = new FormGroup({
    password: new FormControl({value: this.password}, Validators.required),
    email: new FormControl({value: this.email}, [Validators.email, Validators.required]),
    phoneNumber: new FormControl({value: this.phoneNumber}, Validators.required),
    confirmPassword: new FormControl({value: ''}, Validators.required)
  });

  comparisonValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const control1 = group.get('password');
      const control2 = group.get('confirmPassword');
      if (control1.value !== control2.value && control1.enabled && control2.value !== '') {
        control2.setErrors({notEquivalent: 'Les deux saisies ne correspondent pas!'});
      } else {
        control2.setErrors(null);
      }
      return;
    };
  }

  async ngOnInit() {
    this.infoForm.setValidators(this.comparisonValidator());
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
        this.email = responseAuth.email;
        this.infoForm.get('email').setValue(this.email);
        // @ts-ignore
        this.phoneNumber = responseAuth.phone;
        this.infoForm.get('phoneNumber').setValue(this.phoneNumber);
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
      message: 'Etes vous sure de vouloir supprimer le compte?',
      header: 'Suppression',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.userService.deleteAccount(this.id).subscribe(
          () => this.displaySuccessSuppression = true,
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
  }

  saveChanges() {
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
            avatar: 'urltoavatar',
            newsletter: false,
          };
          delete this.newInformation.password;
        } else {
          this.newInformation = {
            password: this.infoForm.get('password').value,
            phone: this.infoForm.get('phoneNumber').value,
            email: this.infoForm.get('email').value,
            avatar: 'urltoavatar',
            newsletter: false,
          };
          this.passwordLabel = 'Mot de passe';
          this.editingPassword = false;
        }
        this.userService.updateInformation(this.id, this.newInformation).subscribe(
          () => this.displaySuccessModification = true,
          error => console.log('Failure', error)
        );
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }

  cancelAction() {
    window.location.reload();
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
}
