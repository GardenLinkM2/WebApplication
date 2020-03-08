import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchComponent } from './research/research.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ResearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ResearchComponent
  ]
})
export class FeaturesModule { }
