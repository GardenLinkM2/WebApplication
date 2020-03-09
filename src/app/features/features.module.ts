import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInformationComponent } from './user-information/user-information.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {AppRoutingModule} from '../app-routing.module';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  declarations: [UserInformationComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    AppRoutingModule,
    CheckboxModule,
  ]
})
export class FeaturesModule { }
