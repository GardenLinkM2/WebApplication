import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeScreenComponent} from './screens/home-screen/home-screen.component';
import {UploadScreenComponent} from './screens/upload-screen/upload-screen.component';
import {UserInformationComponent} from './features/user-information/user-information.component';

import {MdpOublieComponent} from './screens/mdp-oublie/mdp-oublie.component';
import {RecoverPwdScreenComponent} from './screens/recover-pwd-screen/recover-pwd-screen.component';

const routes: Routes = [
  { path: 'accueil', component: HomeScreenComponent },
  { path: 'upload', component: UploadScreenComponent},
  { path: 'mdp-oublie', component: MdpOublieComponent},
  { path: 'lostPassword/:token', component: RecoverPwdScreenComponent},
  { path: 'user-info', component: UserInformationComponent },
  { path: '**',   redirectTo: '/accueil', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
