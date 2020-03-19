import { FeaturesModule } from '../features/features.module';
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
import { PageTitleComponent } from './page-title/page-title.component';
import { DemandComponent } from './demand/demand.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';


import {CarousselComponent} from './caroussel/caroussel.component';
import {AdDetailsCommentsComponent} from './ad-details-comments/ad-details-comments.component';
import {MapComponent} from './map/map.component';
import {FormsModule} from '@angular/forms';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ContactsComponent } from './contacts/contacts.component';


@NgModule({
  declarations: [
    MenuComponent,
    AdCardComponent,
    NavbarComponent,
    IndevelopmentComponent,
    PageTitleComponent,
    DemandComponent,
    PageTitleComponent,
    AdCardComponent,
    CarousselComponent,
    AdDetailsCommentsComponent,
    MapComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    AppRoutingModule,
    DialogModule,
    FeaturesModule,
    TieredMenuModule,
    ToolbarModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    VirtualScrollerModule,
    InputTextareaModule
  ],
  exports: [
    MenuComponent,
    AdCardComponent,
    NavbarComponent,
    PageTitleComponent,
    DemandComponent,
    PageTitleComponent,
    AdCardComponent,
    CarousselComponent,
    AdDetailsCommentsComponent,
    MapComponent,
    ContactsComponent
  ]
})
export class ComponentsModule { }
