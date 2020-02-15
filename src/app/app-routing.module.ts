import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeScreenComponent} from './screens/home-screen/home-screen.component';
import {MdpOublieComponent} from './screens/mdp-oublie/mdp-oublie.component';

const routes: Routes = [
  { path: 'accueil', component: HomeScreenComponent },
  { path: 'mdpoublie', component: MdpOublieComponent},
  { path: '**',   redirectTo: '/accueil', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
