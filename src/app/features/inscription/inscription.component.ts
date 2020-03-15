
import {InscriptionService} from '../../services/inscription/inscription.service';
import { Component, OnInit, forwardRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {Router} from '@angular/router';


import {equalValueValidator} from './customValidation';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})


export class InscriptionComponent implements OnInit {


  myForm: FormGroup;
  recaptcha: any[];
  private captchaValidated: boolean;

  constructor(private enrollment: InscriptionService, private router: Router) {}


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.myForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      phone: new FormControl('', Validators.pattern('[0-9]+')),
      password: new FormControl('', Validators.required),
      repassword: new FormControl('', Validators.required),
      condition: new FormControl(false, Validators.requiredTrue),
      newsletter: new FormControl(false, Validators.nullValidator)
    });
    this.myForm.setValidators(equalValueValidator('password', 'repassword'));

  }

  resolved(captchaResponse: any[]) {
    this.recaptcha = captchaResponse;

    this.captchaValidated = captchaResponse.length === 0 ? false : true;
    }

  validateCaptcha() {
    return this.captchaValidated;
  }

  onSubmit() {
    if (this.myForm.valid && this.captchaValidated) {
        this.enrollment.enroll(this.myForm)
          .subscribe(
            data => this.router.navigateByUrl('acceuil'),
            error => this.router.navigateByUrl('inscription')
          );
    }
  }




}
