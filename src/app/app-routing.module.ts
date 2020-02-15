import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeScreenComponent} from './screens/home-screen/home-screen.component';
import {UploadScreenComponent} from './screens/upload-screen/upload-screen.component';


const routes: Routes = [
  { path: 'accueil', component: HomeScreenComponent },
  { path: 'upload', component: UploadScreenComponent},
  { path: '**',   redirectTo: '/accueil', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
