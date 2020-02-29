import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInformationComponent } from './user-information/user-information.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [UserInformationComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule
  ]
})
export class FeaturesModule { }
