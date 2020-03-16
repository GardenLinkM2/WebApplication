import { InscriptionComponent } from './features/inscription/inscription.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeScreenComponent} from './screens/home-screen/home-screen.component';
import {UploadScreenComponent} from './screens/upload-screen/upload-screen.component';
import {UserInformationComponent} from './features/user-information/user-information.component';

import {MdpOublieComponent} from './screens/mdp-oublie/mdp-oublie.component';
import {RecoverPwdScreenComponent} from './screens/recover-pwd-screen/recover-pwd-screen.component';
import {PersonalSpaceComponent} from './screens/personal-space/personal-space/personal-space.component';
import {IndevelopmentComponent} from './components/indevelopment/indevelopment.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import {FillWalletScreenComponent} from './screens/fill-wallet-screen/fill-wallet-screen.component';
import { LeasingDemandComponent } from './screens/leasing-demand/leasing-demand.component';
import {AuthGuard} from './services/activator/route-activator';
import { TreatDemandsComponent } from './screens/treat-demands/treat-demands.component';

const routes: Routes = [
  { path: 'acceuil', component: HomeScreenComponent },
  { path: 'upload', component: UploadScreenComponent},
  { path: 'edit-ad', component: UploadScreenComponent, canActivate: [AuthGuard]},
  { path: 'mdp-oublie', component: MdpOublieComponent},
  { path: 'lostPassword/:token', component: RecoverPwdScreenComponent},
  { path: 'consulter-demandes', component: TreatDemandsComponent},
  { path: 'inscription', component: InscriptionComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'personal-space', component: PersonalSpaceComponent, canActivate: [AuthGuard],
    children: [
      { path: 'user-info', component: UserInformationComponent },
      { path: 'my-gardens', component: IndevelopmentComponent},
      { path: 'messages', component: IndevelopmentComponent},
      {path: '', redirectTo: 'user-info', pathMatch: 'full'}
      ]
  },
  { path: 'demande-location', component: LeasingDemandComponent},
  { path: 'recharger-compte', component: FillWalletScreenComponent, canActivate: [AuthGuard]},
  { path: '**',   redirectTo: '/acceuil', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
