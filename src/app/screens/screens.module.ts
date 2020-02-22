import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {FeaturesModule} from '../features/features.module';
import {ComponentsModule} from '../components/components.module';
import { UploadScreenComponent } from './upload-screen/upload-screen.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    HomeScreenComponent,
    UploadScreenComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    ComponentsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    BrowserAnimationsModule,
    FileUploadModule,
    HttpClientModule
  ],
  exports: [
    HomeScreenComponent
  ]
})
export class ScreensModule { }
