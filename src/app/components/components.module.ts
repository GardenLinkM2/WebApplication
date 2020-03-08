import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { AdCardComponent } from './ad-card/ad-card.component';
import {AppRoutingModule} from '../app-routing.module';



@NgModule({
  declarations: [
    MenuComponent,
    AdCardComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    AppRoutingModule
  ],
  exports: [
    MenuComponent,
    AdCardComponent
  ]
})
export class ComponentsModule { }
