import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {FeaturesModule} from '../features/features.module';
import {ComponentsModule} from '../components/components.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {AppRoutingModule} from '../app-routing.module';
import { UploadScreenComponent } from './upload-screen/upload-screen.component';
import { MdpOublieComponent } from './mdp-oublie/mdp-oublie.component';
import { RecoverPwdScreenComponent } from './recover-pwd-screen/recover-pwd-screen.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { PersonalSpaceComponent } from './personal-space/personal-space/personal-space.component';
import {DialogModule} from 'primeng/dialog';
import { FillWalletScreenComponent } from './fill-wallet-screen/fill-wallet-screen.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { CardModule } from "primeng/card";
import { LeasingDemandComponent } from './leasing-demand/leasing-demand.component';
import { AdDetailsScreenComponent } from './ad-details-screen/ad-details-screen.component';
import { TreatDemandsComponent } from './treat-demands/treat-demands.component';
import { ToastModule } from "primeng/toast";
import { MesJardinsComponent } from './mes-jardins/mes-jardins.component';

@NgModule({
  declarations: [
    HomeScreenComponent,
    MainLayoutComponent,
    HomeScreenComponent,
    UploadScreenComponent,
    MdpOublieComponent,
    RecoverPwdScreenComponent,
    PersonalSpaceComponent,
    FillWalletScreenComponent,
    LeasingDemandComponent,
    TreatDemandsComponent,
    LeasingDemandComponent,
    RecoverPwdScreenComponent,
    AdDetailsScreenComponent,
    MesJardinsComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    ComponentsModule,
    AppRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    BrowserAnimationsModule,
    FileUploadModule,
    HttpClientModule,
    DialogModule,
    ConfirmDialogModule,
    CardModule,
    ToastModule
  ],
  exports: [
    HomeScreenComponent,
    MainLayoutComponent,
    HomeScreenComponent,
    UploadScreenComponent,
    MdpOublieComponent,
    RecoverPwdScreenComponent
  ]
})
export class ScreensModule { }
