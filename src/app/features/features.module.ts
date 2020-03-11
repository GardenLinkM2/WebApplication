import { InputTextModule } from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {CaptchaModule} from 'primeng/captcha';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchComponent } from './research/research.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UserInformationComponent } from './user-information/user-information.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {AppRoutingModule} from '../app-routing.module';
import { InscriptionComponent } from './inscription/inscription.component';


@NgModule({
  declarations: [ResearchComponent, InscriptionComponent, UserInformationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    AppRoutingModule,
    CheckboxModule,
  ],
  exports: [
    ResearchComponent,
    InscriptionComponent
  ]
})
export class FeaturesModule { }
