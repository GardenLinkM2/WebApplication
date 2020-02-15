import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {FeaturesModule} from '../features/features.module';
import {ComponentsModule} from '../components/components.module';
import { UploadScreenComponent } from './upload-screen/upload-screen.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    HomeScreenComponent,
    UploadScreenComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeScreenComponent
  ]
})
export class ScreensModule { }
