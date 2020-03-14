import { ModalService } from '../../services/modal-service/modal.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/connexion/authentication.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user-info/user.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  loginForm: FormGroup;
  invalidate: boolean;
  displayModal: boolean;

  constructor(private formBuilder: FormBuilder,
              private connexion: AuthenticationService,
              private router: Router,
              private modal: ModalService,
              private userService: UserService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      mail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.modal.currentModalState.subscribe(display => this.displayModal = display);
    this.invalidate = false;
  }

  closeDialog() {
    this.modal.closeDialog();
  }


  async onSubmit() {

    if (this.loginForm.valid) {
      this.connexion.logout();
      await this.connexion.login(this.loginForm).toPromise()
        .then(
          user => {
            this.connexion.tokenIntroscpection(user.access_token);
            localStorage.setItem('userToken', user.user_token);
            localStorage.setItem('accessToken', user.access_token);
            this.invalidate = false;
            this.closeDialog();
          },
          error => this.invalidate = true
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
              localStorage.setItem('lastName', responseAuth.lastName);}

          );
          this.loginForm.reset();
        }
      );
    } else {
      this.invalidate = true;
    }

  }


}
