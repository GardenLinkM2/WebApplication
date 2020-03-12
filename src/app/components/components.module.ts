import { FeaturesModule } from './../features/features.module';
import { ConnexionComponent } from './connexion/connexion.component';
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
import {TieredMenuModule} from 'primeng/tieredmenu';
import { PageTitleComponent } from "./page-title/page-title.component";



@NgModule({
  declarations: [
    MenuComponent,
    AdCardComponent,
    NavbarComponent,
    IndevelopmentComponent,
    PageTitleComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    AppRoutingModule,
    DialogModule,
    FeaturesModule,
    TieredMenuModule,
  ],
  exports: [
    MenuComponent,
    AdCardComponent,
    NavbarComponent,
    PageTitleComponent
  ]
})
export class ComponentsModule { }
