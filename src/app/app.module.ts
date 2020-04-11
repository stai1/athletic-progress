import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './layouts/main/main.component';
import { AuthService } from './auth/auth.service';
import { AuthCheck } from './auth/auth-check';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthCheck,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
