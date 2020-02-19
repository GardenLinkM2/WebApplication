import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {FeaturesModule} from '../features/features.module';
import {ComponentsModule} from '../components/components.module';
import { MdpOublieComponent } from './mdp-oublie/mdp-oublie.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    HomeScreenComponent,
    MdpOublieComponent
  ],
    imports: [
        CommonModule,
        FeaturesModule,
        ComponentsModule,
        ReactiveFormsModule,
        InputTextModule,
        HttpClientModule
    ],
  exports: [
    HomeScreenComponent,
    MdpOublieComponent
  ]
})
export class ScreensModule { }
