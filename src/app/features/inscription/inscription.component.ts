import {InscriptionService} from '../../services/inscription/inscription.service';
import { Component, OnInit } from '@angular/core';
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
      captcha: new FormControl(false, Validators.requiredTrue),
      condition: new FormControl(false, Validators.requiredTrue),
      newsletter: new FormControl(false, Validators.nullValidator)
    });
    this.myForm.setValidators(equalValueValidator('password', 'repassword'));

  }

  onSubmit() {

    if (this.myForm.valid) {
        console.warn(this.myForm);
        this.enrollment.enroll(this.myForm)
          .subscribe(
            data => this.router.navigateByUrl('acceuil'),
            error => this.router.navigateByUrl('inscription')
          );
    }
  }




}
