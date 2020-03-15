import { ConnexionComponent } from '../components/connexion/connexion.component';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CaptchaModule } from 'primeng/captcha';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchComponent } from './research/research.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInformationComponent } from './user-information/user-information.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { AppRoutingModule } from '../app-routing.module';
import { InscriptionComponent } from './inscription/inscription.component';
import { FillWalletComponent } from './fill-wallet/fill-wallet.component';
import { SpinnerModule } from 'primeng/spinner';
import { ConfirmLeasingDComponent } from './confirm-leasing-d/confirm-leasing-d.component';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    ResearchComponent,
    UserInformationComponent,
    InscriptionComponent,
    ConnexionComponent,
    FillWalletComponent,
    ConfirmLeasingDComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    AppRoutingModule,
    CheckboxModule,
    SpinnerModule,
    ToastModule,
    FileUploadModule,
    RecaptchaModule,
    ReactiveFormsModule
  ],
  exports: [
    ResearchComponent,
    InscriptionComponent,
    ConnexionComponent,
    FillWalletComponent,
    ConfirmLeasingDComponent
  ]
})
export class FeaturesModule { }
