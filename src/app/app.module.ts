import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './layouts/main/main.component';
import { AuthService } from './auth/auth.service';
import { AuthCheck } from './auth/auth-check';
import { AuthModule } from './auth/auth.module';
import { ContentComponent } from './layouts/content/content.component';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ContentComponent,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [
    AuthService,
    AuthCheck,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
