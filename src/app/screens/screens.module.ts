import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {FeaturesModule} from '../features/features.module';
import {ComponentsModule} from '../components/components.module';
import { MdpOublieComponent } from './mdp-oublie/mdp-oublie.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RecoverPwdScreenComponent } from './recover-pwd-screen/recover-pwd-screen.component';


@NgModule({
  declarations: [
    HomeScreenComponent,
    MdpOublieComponent,
    RecoverPwdScreenComponent
  ],
    imports: [
        CommonModule,
        FeaturesModule,
        ComponentsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        HttpClientModule,
    ],
  exports: [
    HomeScreenComponent,
    MdpOublieComponent,
    RecoverPwdScreenComponent
  ]
})
export class ScreensModule { }
