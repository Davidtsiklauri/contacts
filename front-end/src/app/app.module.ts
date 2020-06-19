import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthenticationInterceptor } from './interceptors/auth.interceptor';
import { GlobalService } from './global.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthenticationInterceptor,
       multi: true
    },
    {
      provide: GlobalService,
      useClass: GlobalService,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 