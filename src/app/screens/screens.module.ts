import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {FeaturesModule} from '../features/features.module';
import {ComponentsModule} from '../components/components.module';
import { MpdOublieComponent } from './mpd-oublie/mpd-oublie.component';



@NgModule({
  declarations: [
    HomeScreenComponent,
    MpdOublieComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    ComponentsModule
  ],
  exports: [
    HomeScreenComponent
  ]
})
export class ScreensModule { }
