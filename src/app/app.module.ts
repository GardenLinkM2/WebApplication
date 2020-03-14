import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ScreensModule} from './screens/screens.module';
import {ComponentsModule} from './components/components.module';
import {FeaturesModule} from './features/features.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './req-interceptor';
import {AuthGuard} from './services/activator/route-activator';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScreensModule,
    ComponentsModule,
    FeaturesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
