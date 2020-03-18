import { ModalService } from '../../services/modal-service/modal.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/connexion/authentication.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user-info/user.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
  providers: [
    MessageService
  ]
})
export class ConnexionComponent implements OnInit {

  loginForm: FormGroup;
  displayModal: boolean;

  constructor(private formBuilder: FormBuilder,
              private connexion: AuthenticationService,
              private router: Router,
              private modal: ModalService,
              private userService: UserService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      mail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.modal.currentModalState.subscribe(display => this.displayModal = display);
  }

  closeDialog() {
    this.modal.closeDialog();
  }


  showWrongCredentials() {
    this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'E-mail ou mot de passe incorrect.'});
  }

  showEmptyForm() {
    this.messageService.add({severity: 'info', summary: 'Informations', detail: 'Veuillez renseigner un e-mail et un mot de passe.'});
  }


  async onSubmit() {

    if (this.loginForm.valid) {

      await this.connexion.login(this.loginForm).toPromise()
        .then(
          user => {
            this.connexion.tokenIntroscpection(user.access_token);
            localStorage.setItem('userToken', user.user_token);
            localStorage.setItem('accessToken', user.access_token);
          },
          error => this.showWrongCredentials()

        );
      await this.connexion.syn(localStorage.getItem('accessToken')).toPromise().then(
        response => {
          localStorage.setItem('synToken', response.token);
          this.userService.getUserInfoAuth().toPromise().then(
            // @ts-ignore
            responseAuth => {
              // @ts-ignore
              localStorage.setItem('avatarURL', responseAuth.avatar);
                    // @ts-ignore
              localStorage.setItem('firstName', responseAuth.firstName);
                    // @ts-ignore
              localStorage.setItem('lastName', responseAuth.lastName);
                    // @ts-ignore
              localStorage.setItem('id', responseAuth.id);
            }

          );
        }

      );

      this.closeDialog();
      this.loginForm.reset();



    } else {
      this.showEmptyForm();
    }

  }


}
