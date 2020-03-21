import { MesJardinsComponent } from './screens/mes-jardins/mes-jardins.component';
import { InscriptionComponent } from './features/inscription/inscription.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeScreenComponent} from './screens/home-screen/home-screen.component';
import {UploadScreenComponent} from './screens/upload-screen/upload-screen.component';
import {UserInformationComponent} from './features/user-information/user-information.component';
import { ReportAdComponent } from './screens/report-ad/report-ad.component';

import {MdpOublieComponent} from './screens/mdp-oublie/mdp-oublie.component';
import {RecoverPwdScreenComponent} from './screens/recover-pwd-screen/recover-pwd-screen.component';
import {AdDetailsScreenComponent} from './screens/ad-details-screen/ad-details-screen.component';
import {PersonalSpaceComponent} from './screens/personal-space/personal-space/personal-space.component';
import {FillWalletScreenComponent} from './screens/fill-wallet-screen/fill-wallet-screen.component';
import { LeasingDemandComponent } from './screens/leasing-demand/leasing-demand.component';
import {AuthGuard} from './services/activator/route-activator';
import { TreatDemandsComponent } from './screens/treat-demands/treat-demands.component';
import {MessengerComponent} from './screens/messenger/messenger.component';

const routes: Routes = [
  { path: 'acceuil', component: HomeScreenComponent },
  { path: 'publier', component: UploadScreenComponent},
  { path: 'modifier-annonce', component: UploadScreenComponent, canActivate: [AuthGuard]},
  { path: 'mdp-oublie', component: MdpOublieComponent},
  { path: 'reinitialisation-mdp/:token', component: RecoverPwdScreenComponent},
  { path: 'signaler-annonce/:id', component: ReportAdComponent},
  { path: 'consulter-demandes', component: TreatDemandsComponent},
  { path: 'inscription', component: InscriptionComponent},
  { path: 'espace-personel', component: PersonalSpaceComponent, canActivate: [AuthGuard],
    children: [
      { path: 'mes-info', component: UserInformationComponent },
      { path: 'mes-jardins', component: MesJardinsComponent},
      { path: 'messages', component: MessengerComponent},
      { path: 'messages/:ownerId', component: MessengerComponent},
      {path: '', redirectTo: 'mes-info', pathMatch: 'full'}
      ]
  },
  { path: 'demande-location/:id', component: LeasingDemandComponent},
  { path: 'recharger-compte', component: FillWalletScreenComponent, canActivate: [AuthGuard]},
  { path: 'details-annonce/:id', component: AdDetailsScreenComponent},
  { path: '**',   redirectTo: '/acceuil', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
