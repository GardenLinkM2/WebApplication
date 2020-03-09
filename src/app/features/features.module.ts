import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchComponent } from './research/research.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UserInformationComponent } from './user-information/user-information.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {AppRoutingModule} from '../app-routing.module';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  declarations: [ResearchComponent, UserInformationComponent],
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
    ResearchComponent
  ]
})
export class FeaturesModule { }
