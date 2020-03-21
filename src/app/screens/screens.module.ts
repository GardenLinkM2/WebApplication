import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {FeaturesModule} from '../features/features.module';
import {ComponentsModule} from '../components/components.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {AppRoutingModule} from '../app-routing.module';
import { ReportAdComponent } from './report-ad/report-ad.component';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {UploadScreenComponent} from './upload-screen/upload-screen.component';
import {RecoverPwdScreenComponent} from './recover-pwd-screen/recover-pwd-screen.component';
import {FillWalletScreenComponent} from './fill-wallet-screen/fill-wallet-screen.component';
import {MdpOublieComponent} from './mdp-oublie/mdp-oublie.component';
import {PersonalSpaceComponent} from './personal-space/personal-space/personal-space.component';
import {LeasingDemandComponent} from './leasing-demand/leasing-demand.component';
import {TreatDemandsComponent} from './treat-demands/treat-demands.component';
import {AdDetailsScreenComponent} from './ad-details-screen/ad-details-screen.component';
import {MesJardinsComponent} from './mes-jardins/mes-jardins.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {HttpClientModule} from '@angular/common/http';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileUploadModule} from 'primeng/fileupload';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessengerComponent } from './messenger/messenger.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [
    HomeScreenComponent,
    MainLayoutComponent,
    HomeScreenComponent,
    UploadScreenComponent,
    MdpOublieComponent,
    RecoverPwdScreenComponent,
    ReportAdComponent,
    PersonalSpaceComponent,
    FillWalletScreenComponent,
    LeasingDemandComponent,
    TreatDemandsComponent,
    LeasingDemandComponent,
    RecoverPwdScreenComponent,
    AdDetailsScreenComponent,
    MesJardinsComponent,
    MessengerComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    ComponentsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    BrowserAnimationsModule,
    FileUploadModule,
    HttpClientModule,
    CardModule,
    InputTextareaModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    ProgressSpinnerModule
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
