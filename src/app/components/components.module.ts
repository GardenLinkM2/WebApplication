import { FeaturesModule } from './../features/features.module';
import { ConnexionComponent } from './../features/connexion/connexion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { AdCardComponent } from './ad-card/ad-card.component';
import {AppRoutingModule} from '../app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { IndevelopmentComponent } from './indevelopment/indevelopment.component';
import {DialogModule} from 'primeng/dialog';



@NgModule({
  declarations: [
    MenuComponent,
    AdCardComponent,
    NavbarComponent,
    IndevelopmentComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    AppRoutingModule,
    DialogModule,
    FeaturesModule
  ],
  exports: [
    MenuComponent,
    AdCardComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
