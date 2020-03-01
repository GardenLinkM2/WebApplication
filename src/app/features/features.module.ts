import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInformationComponent } from './user-information/user-information.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [UserInformationComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule,
  ]
})
export class FeaturesModule { }
